// --- ➊ 페이지 로드 시 시간 기록 ---
let formOpenTime = Date.now();

document.getElementById("phone2").addEventListener("input", function() {
  this.value = this.value.replace(/[^0-9]/g, "");
});
document.getElementById("phone3").addEventListener("input", function() {
  this.value = this.value.replace(/[^0-9]/g, "");
});

// 개인정보 동의 내용 보기 기능
const viewBtn = document.getElementById("viewAgreeBtn");
const agreeContent = document.getElementById("agreeContent");

viewBtn.addEventListener("click", () => {
  if (agreeContent.style.display === "block") {
    agreeContent.style.display = "none";
    viewBtn.textContent = "보기";
  } else {
    agreeContent.style.display = "block";
    viewBtn.textContent = "닫기";
  }
});

// EmailJS 초기화
emailjs.init("FMS-nexppzBEa8dEo"); // ★ Public Key

document.getElementById("estimateForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const submitBtn = document.getElementById("submitBtn");

  // --- ➋ 5초 제한 체크 ---
  const now = Date.now();
  if (now - formOpenTime < 5000) {
    alert("폼을 너무 빠르게 제출할 수 없습니다. 다시 시도해주세요.");
    submitBtn.disabled = false;
    submitBtn.textContent = "제출";
    return;
  }

  // 개인정보수집 동의 체크
  if (!document.getElementById("agree").checked) {
    alert("개인정보 수집 동의가 필요합니다.");
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = "전송 중...";

  const SERVICE_ID = "oktarnd_test"; 
  const TEMPLATE_ID = "template_1j1iwmc";

  const phone1 = document.getElementById("phone1").value;
  const phone2 = document.getElementById("phone2").value;
  const phone3 = document.getElementById("phone3").value;
  const phoneRule = /^[0-9]{4}$/;

  if (!phoneRule.test(phone2) || !phoneRule.test(phone3)) {
    alert("연락처 형식이 올바르지 않습니다. 예: 010-1234-5678");
    submitBtn.disabled = false;
    submitBtn.textContent = "제출";
    return;
  }

  // reCAPTCHA 확인
  const recaptchaResponse = grecaptcha.getResponse();
  if (!recaptchaResponse) {
    alert("스팸 방지를 위해 로봇 인증을 완료해주세요.");
    submitBtn.disabled = false;
    submitBtn.textContent = "제출";
    return;
  }

  const fullPhone = `${phone1}-${phone2}-${phone3}`;

  const templateParams = {
    organization: document.getElementById("organization").value,
    name: document.getElementById("name").value,
    phone: fullPhone,
    email: document.getElementById("email").value,
    country: document.getElementById("country").value,
    message: document.getElementById("message").value
  };

  emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
    .then(function() {
      const result = document.getElementById("resultMsg");
      result.textContent = "성공적으로 접수되었습니다. 빠르게 연락드리겠습니다.";
      result.classList.add("success");
      result.style.display = "block";

      document.getElementById("estimateForm").reset();
      submitBtn.disabled = false;
      submitBtn.textContent = "제출";

      // 폼 다시 제출할 수 있도록 시간 리셋
      formOpenTime = Date.now();
    })
    .catch(function(error) {
      const result = document.getElementById("resultMsg");
      result.textContent = "전송 중 오류가 발생했습니다. 다시 시도해주세요.";
      result.classList.add("error");
      result.style.display = "block";

      console.error("EmailJS Error:", error);
      submitBtn.disabled = false;
      submitBtn.textContent = "제출";
    });
});

// 닫기 버튼 클릭 시 팝업 종료
document.getElementById("closeBtn").addEventListener("click", function() {
  window.close();
});
