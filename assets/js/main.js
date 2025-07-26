let prefix = window.location.href.split('?').length == 2 ? window.location.href.split('?')[1] : '';
let image = document.querySelector('#image');
if (prefix.split('&').length > 1) {
  // ถ้าไม่มี prefix ใน URL ให้ใช้ค่าเริ่มต้น
  prefix = prefix.split('&')[0];
}
if (prefix) {
  image.setAttribute('src', image.getAttribute('src').replaceAll('null', prefix));
}else  {
  image.setAttribute('src', image.getAttribute('src').replaceAll('null.png', 'ld.gif'));
}
console.log("prefix:", prefix)
async function checkApisAndRedirect() {
  const apiEndpoints = [
    `https://${prefix}.la.myeffect.net`,
    `https://${prefix}.laos.nhlfan.net`,
    `https://${prefix}.sen.hopto.me`,
    `https://${prefix}.sen.zapto.org`,
    `https://${prefix}.vt.servep2p.com`,
    `https://${prefix}.la2.read-books.org`,
    `https://${prefix}.duckgo.ddns.net`,
    `https://${prefix}.serv.ddns.me`,
    `https://${prefix}.la.viperx.me`,
    // `https://${prefix}.sv2.gotdns.ch`,
    // `https://${prefix}.sv3.gotdns.ch`,
    // `https://${prefix}.sv4.gotdns.ch`,
  ];

  // สร้าง Promise สำหรับแต่ละ API
  const checks = apiEndpoints.map(apiUrl =>
    fetch(apiUrl, { method: 'GET' })
      .then(response => {
        if (response.status === 200) {
          // ถ้าตอบกลับ 200 OK -> คืน domain สำหรับ redirect
          return apiUrl.replace('/api', '/');
        } else {
          throw new Error(`Non-200 response from ${apiUrl}`);
        }
      })
  );

  try {
    // รอให้หนึ่งใน API ตอบกลับสำเร็จ
    const targetDomain = await Promise.any(checks);
    window.location.href = targetDomain;
  } catch (error) {
    console.error("No API responded with 200 OK:", error);
    openModal();
  }
}
window.addEventListener('load', () => {
  // เรียกหลังโหลด HTML, CSS, รูปภาพ เสร็จทั้งหมด
  setTimeout(() => {
    checkApisAndRedirect();
  }, 1500);
});

// เรียกใช้ฟังก์ชันตอนโหลดหน้า
//checkApisAndRedirect();

  function openModal() {
    var myModal = new bootstrap.Modal(document.getElementById('modal-1'));
    myModal.show();
  }
