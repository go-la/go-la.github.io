const prefix = window.location.href.split('?').length == 2 ? window.location.href.split('?')[1] : '';
console.log('prefix:', prefix);
async function checkApisAndRedirect() {
  const _0x53096b = ["https://" + prefix + ".la.myeffect.net", "https://" + prefix + ".laos.nhlfan.net", "https://" + prefix + ".sen.hopto.me", "https://" + prefix + ".sen.zapto.org"];
  const _0x1043c2 = {
    method: 'GET'
  };
  const _0x1679f8 = _0x53096b.map(_0x4e6cd4 => fetch(_0x4e6cd4, _0x1043c2).then(_0x2be10d => {
    if (_0x2be10d.status === 200) {
      return _0x4e6cd4.replace("/api", '/');
    } else {
      throw new Error("Non-200 response from " + _0x4e6cd4);
    }
  }));
  try {
    const _0x65e8a6 = await Promise.any(_0x1679f8);
    window.location.href = _0x65e8a6;
  } catch (_0xbf551c) {
    console.error("No API responded with 200 OK:", _0xbf551c);
    openModal();
  }
}
checkApisAndRedirect();
function openModal() {
  var _0x38fed3 = new bootstrap.Modal(document.getElementById("modal-1"));
  _0x38fed3.show();
}