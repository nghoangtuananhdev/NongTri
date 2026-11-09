window.asset = function (p) { return (window.__ASSETS && window.__ASSETS[p]) || p; };
function renderIcons(root) {
  $(root || document).find('[data-icon]').each(function () {
    var svg = (window.ICONS || {})[this.getAttribute('data-icon')]; if (!svg) return;
    var $svg = $(svg).addClass('ico ' + (this.className || '')).attr('aria-hidden', 'true');
    $(this).replaceWith($svg);
  });
}
var M = window.MOCK;
var ic = function (n) { return '<span class="ico" data-icon="' + n + '"></span>'; };
var vn = function (n) { return n.toLocaleString('vi-VN'); };
var TABS = [['01-trang-chu', 'house-door', 'Trang chủ'], ['02-chup-anh', 'camera', 'Chẩn đoán'], ['04-hoi-dap', 'mic', 'Hỏi đáp'], ['05-gia-nong-san', 'graph-up-arrow', 'Giá cả'], ['06-nhat-ky', 'journal-text', 'Nhật ký']];

function sbar(cls) { return '<div class="sbar ' + (cls || '') + '"><b>9:41</b><span>' + ic('reception-4') + ic('wifi') + ic('battery-full') + '</span></div>'; }
function tabbar(on) {
  return '<div class="tabbar" data-figma-name="Thanh tab">' + TABS.map(function (t) {
    return '<a class="tab' + (t[0] === on ? ' on' : '') + '" href="' + t[0] + '.html">' + ic(t[1]) + t[2] + '</a>';
  }).join('') + '</div>';
}
function screen(tab, body) { return sbar() + '<div class="body">' + body + '</div>' + tabbar(tab); }
function back(href, title, right) {
  return '<div class="top"><div class="top-b"><a class="bk" href="' + href + '">' + ic('chevron-left') + '</a><div class="h2">' + title + '</div></div>' + (right || '') + '</div>';
}

function chart(p) {
  var W = 342, H = 170, n = p.history.length + p.forecast.length - 1, dx = W / n;
  var y = function (v) { return (H - 10 - (v - 6850) * (H - 20) / 700).toFixed(1); };
  var hi = p.history.map(function (v, i) { return (i * dx).toFixed(1) + ',' + y(v); }).join(' ');
  var off = p.history.length - 1;
  var fo = p.forecast.map(function (v, i) { return ((off + i) * dx).toFixed(1) + ',' + y(v); }).join(' ');
  var up = p.forecast.map(function (v, i) { return ((off + i) * dx).toFixed(1) + ',' + y(v + p.spread[i]); });
  var lo = p.forecast.map(function (v, i) { return ((off + i) * dx).toFixed(1) + ',' + y(v - p.spread[i]); }).reverse();
  return '<div class="chart" data-figma-name="Biểu đồ giá"><svg width="342" height="170" viewBox="0 0 342 170">' +
    '<line x1="0" y1="168" x2="342" y2="168" stroke="#E5E7EB" stroke-width="2"/>' +
    '<polygon points="' + up.concat(lo).join(' ') + '" fill="#F59E0B" opacity="0.15"/>' +
    '<polyline points="' + hi + '" fill="none" stroke="#15803D" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>' +
    '<polyline points="' + fo + '" fill="none" stroke="#F59E0B" stroke-width="3" stroke-dasharray="7 5" stroke-linecap="round"/></svg>' +
    '<span class="ax" style="left:0">1/10</span><span class="ax" style="left:' + (off * dx - 16).toFixed(0) + 'px">30/10</span><span class="ax" style="right:0">13/11</span></div>';
}

var PAGES = {
  '01-trang-chu': function () {
    var f = M.farmer, w = M.weather, s = M.season;
    var g = [['02-chup-anh', 'camera', 'Chụp lá, biết bệnh'], ['04-hoi-dap', 'mic', 'Hỏi bằng giọng nói'], ['05-gia-nong-san', 'graph-up-arrow', 'Giá lúa hôm nay'], ['06-nhat-ky', 'journal-text', 'Nhật ký mùa vụ']]
      .map(function (x) { return '<a class="cd big" href="' + x[0] + '.html"><div class="big-i">' + ic(x[1]) + '</div>' + x[2] + '</a>'; }).join('');
    return screen('01-trang-chu',
      '<div class="top" style="height:64px"><div><div class="h1">Chào ' + f.name + ',</div><div class="sub">' + f.farm + '</div></div><div class="top-b"><div class="ib">' + ic('bell') + '<span class="rd"></span></div><a class="ib" href="07-quyen-rieng-tu.html">' + ic('gear') + '</a></div></div>' +
      '<div class="cd wx" data-figma-name="Thời tiết"><div style="flex:1"><div class="wx-t">' + w.temp + ' · ' + w.desc + '</div><div class="wx-d">' + w.advice + '</div></div>' + ic('cloud-rain') + '</div>' +
      '<div class="al" data-figma-name="Cảnh báo dịch"><div class="al-t">Cảnh báo dịch: ' + M.alert + '</div><a class="al-l" href="04-hoi-dap.html">Xem cách phòng</a></div>' +
      '<div class="g22" data-figma-name="Nút chức năng">' + g + '</div>' +
      '<div class="cd"><div style="font-size:18px;font-weight:700">' + s.name + '</div><div class="sub">Ngày ' + s.day + '/' + s.total + ' · ' + s.stage + '</div><div class="bar"><div style="width:' + s.day + '%"></div></div></div>');
  },

  '02-chup-anh': function () {
    var corner = function (st) { return '<div class="fr" style="' + st + '"></div>'; };
    return '<div class="cam"><img src="' + asset('assets/img/leaf.jpg') + '"><div style="position:absolute;left:0;top:0;width:390px;height:844px;background:rgba(17,24,39,0.25)"></div></div>' +
      sbar('dk') +
      '<div class="cam-top"><a class="ib" href="01-trang-chu.html">' + ic('x-lg') + '</a><div class="cam-t">Chụp lá bị bệnh</div><div class="ib">' + ic('lightning-charge-fill') + '</div></div>' +
      '<div class="cc"><span class="chipc on">Lúa</span><span class="chipc">Sầu riêng</span><span class="chipc">Xoài</span></div>' +
      corner('left:50px;top:215px;border-top-width:4px;border-left-width:4px;border-top-left-radius:10px') + corner('left:300px;top:215px;border-top-width:4px;border-right-width:4px;border-top-right-radius:10px') +
      corner('left:50px;top:520px;border-bottom-width:4px;border-left-width:4px;border-bottom-left-radius:10px') + corner('left:300px;top:520px;border-bottom-width:4px;border-right-width:4px;border-bottom-right-radius:10px') +
      '<div class="guide">Đưa lá vào giữa khung, đủ sáng, không rung tay</div>' +
      '<div class="cam-bar"><div class="gal"><img src="' + asset('assets/img/leaf.jpg') + '"></div><a class="shot" href="03-ket-qua.html"></a>' +
      '<a class="vo" href="04-hoi-dap.html"><div class="vo-i">' + ic('mic') + '</div>Hỏi bằng giọng nói</a></div>';
  },

  '03-ket-qua': function () {
    var d = M.diagnosis;
    var st = d.steps.map(function (t, i) { return '<div class="st"><div class="st-n">' + (i + 1) + '</div><div>' + t + '</div></div>'; }).join('');
    return screen('02-chup-anh',
      back('02-chup-anh.html', 'Kết quả chẩn đoán') +
      '<div class="cd dg" data-figma-name="Kết quả"><img src="' + asset('assets/img/leaf.jpg') + '"><div style="flex:1"><div class="dg-n">' + d.disease + '</div>' +
      '<div class="cf">Độ tin cậy ' + d.confidence + '%</div><div class="bar" style="margin:2px 0 6px"><div style="width:' + d.confidence + '%"></div></div><div class="small">Mức độ: ' + d.severity + '</div></div></div>' +
      '<div class="cd" data-figma-name="Nên làm ngay"><div class="h2" style="margin-bottom:4px">Nên làm ngay</div>' + st + '</div>' +
      '<div class="warn">' + ic('info-circle') + '<div>Kết quả do AI gợi ý. Hãy hỏi cán bộ khuyến nông trước khi phun thuốc.</div></div>' +
      '<div style="display:flex;gap:12px"><div class="bt bt-o" style="flex:0.8">' + ic('volume-up') + 'Nghe đọc</div><div class="bt bt-p" style="flex:1.2;font-size:19px">' + ic('telephone') + 'Gọi khuyến nông</div></div>' +
      '<a class="lnk" href="06-nhat-ky.html">Lưu vào nhật ký</a>');
  },

  '04-hoi-dap': function () {
    return screen('04-hoi-dap',
      '<div class="top"><div class="h2">Hỏi đáp cùng Nông Trí</div></div>' +
      '<div class="bu">' + ic('volume-up') + 'Lúa tui bị vàng lá ở chân ruộng, có sao không?</div>' +
      '<div class="ba">Vàng lá ở chân ruộng thường do thiếu đạm hoặc ngộ độc hữu cơ khi ruộng ngập lâu. Chú thử rút nước 2–3 ngày rồi bón bổ sung đạm. Nếu lá có đốm nâu viền vàng thì chụp ảnh để Nông Trí kiểm tra.' +
      '<div class="src">Nguồn: Tài liệu khuyến nông (dữ liệu mô phỏng)</div><div class="again">' + ic('play-circle') + 'Nghe lại</div></div>' +
      '<div class="chp"><a href="02-chup-anh.html">Chụp ảnh lá</a><span>Hỏi giá phân bón</span></div>' +
      '<div class="micw"><div class="kb">' + ic('keyboard') + 'Gõ chữ</div><div><div class="mic-o"><div class="mic">' + ic('mic-fill') + '</div></div><div class="small" style="text-align:center;font-weight:700;color:#14532D">Bấm và nói</div></div><div style="width:72px"></div></div>');
  },

  '05-gia-nong-san': function () {
    var p = M.prices;
    var tr = M.traders.map(function (t) {
      return '<div class="tr"><div><div class="tr-n">' + t.name + '</div><div class="tr-p">' + vn(t.price) + ' đ/kg · ' + t.km + ' km</div></div><div class="call">' + ic('telephone') + '</div></div>';
    }).join('');
    return screen('05-gia-nong-san',
      '<div class="seg" style="margin-top:4px"><span class="on">Lúa</span><span>Sầu riêng</span><span>Xoài</span></div>' +
      '<div class="cd" style="padding:12px 4px 4px"><div style="padding:0 12px"><div class="sub">' + p.product + ' · ' + p.region + '</div><div style="display:flex;align-items:center;justify-content:space-between"><div class="price">' + vn(p.now) + ' đ/kg</div>' +
      '<div class="up">' + ic('caret-up-fill') + vn(p.delta) + ' đ</div></div><div class="small" style="margin-top:-2px">so với tuần trước</div></div>' + chart(p) + '</div>' +
      '<div class="cd fc" style="padding:12px 16px">' + ic('stars') + '<div><div style="font-size:18px;line-height:24px"><b>AI dự báo:</b> giá có thể tăng nhẹ 2–4% trong 2 tuần tới. Độ tin cậy: trung bình.</div>' +
      '<div class="small" style="margin-top:4px">Chỉ mang tính tham khảo, không phải lời khuyên mua bán.</div></div></div>' +
      '<div class="cd" style="padding:4px 16px">' + tr + '</div>');
  },

  '06-nhat-ky': function () {
    var tl = M.diary.map(function (d, i) {
      var inner = '<div class="dotc" style="background:' + d.color + '"></div><div><div class="tl-d">' + d.date + '</div><div class="tl-x">' + d.text + '</div></div>';
      return d.link ? '<a class="tlv" href="' + d.link + '">' + inner + '</a>' : '<div class="tlv">' + inner + '</div>';
    }).join('');
    return screen('06-nhat-ky',
      back('01-trang-chu.html', 'Nhật ký mùa vụ', '<a class="ib" href="07-quyen-rieng-tu.html">' + ic('gear') + '</a>') +
      '<div class="cd" data-figma-name="Tổng kết"><div class="sum"><div><div class="small">Chi phí đã chi</div><b>' + M.cost + '</b></div><div><div class="small">Dự kiến thu</div><b>' + M.revenue + '</b></div></div>' +
      '<div style="margin-top:8px;font-size:18px;font-weight:700;color:#15803D">Lợi nhuận ước tính: ' + M.profit + '</div></div>' +
      '<div class="cd" style="flex:1"><div class="h2" style="margin-bottom:6px">Dòng thời gian</div>' + tl + '</div>' +
      '<div class="bt bt-p" style="flex:none">' + ic('mic') + 'Ghi nhật ký bằng giọng nói</div>');
  },

  '07-quyen-rieng-tu': function () {
    var sw = function (t, on) { return '<div class="cd sw-r"><div>' + t + '</div><div class="swt' + (on ? ' on' : '') + '"><i></i></div></div>'; };
    return screen('06-nhat-ky',
      back('01-trang-chu.html', 'Quyền riêng tư') +
      '<div class="sub" style="font-size:18px;line-height:26px">Chú quyết định dữ liệu nào được chia sẻ. Có thể đổi bất cứ lúc nào.</div>' +
      sw('Chia sẻ ảnh lá (ẩn danh) để AI học tốt hơn', true) + sw('Chia sẻ vị trí ruộng để nhận cảnh báo dịch', true) + sw('Cho cán bộ khuyến nông xem nhật ký', false) +
      '<div class="cd sec">' + ic('shield-lock') + '<div style="font-size:17px;line-height:24px">Dữ liệu được mã hóa và lưu trên máy chủ đặt tại Việt Nam. Nông Trí không bán dữ liệu cho bên thứ ba.</div></div>' +
      '<div class="bt bt-o" style="flex:none">' + ic('download') + 'Tải dữ liệu của tôi</div><div class="bt bt-d" style="flex:none">' + ic('trash3') + 'Xóa toàn bộ dữ liệu</div>');
  }
};

$(function () {
  $('#app').html(PAGES[document.body.getAttribute('data-page')]());
  renderIcons();
});
