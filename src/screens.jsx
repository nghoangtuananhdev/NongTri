import React from 'react';
import M from './mock-data.js';
import { Icon } from './icons.jsx';
const vn = function (n) {
  return n.toLocaleString('vi-VN');
};
const TABS = [
  ['01-trang-chu', 'house-door', 'Trang chủ'],
  ['02-chup-anh', 'camera', 'Chẩn đoán'],
  ['04-hoi-dap', 'mic', 'Hỏi đáp'],
  ['05-gia-nong-san', 'graph-up-arrow', 'Giá cả'],
  ['06-nhat-ky', 'journal-text', 'Nhật ký'],
];
function sbar(cls) {
  return (
    <div className={'sbar ' + (cls || '')}>
      <b>9:41</b>
      <span>
        <Icon name="reception-4" />
        <Icon name="wifi" />
        <Icon name="battery-full" />
      </span>
    </div>
  );
}
function tabbar(on) {
  return (
    <div className="tabbar" data-figma-name="Thanh tab">
      {TABS.map(function (t) {
        return (
          <a key={t[0]} className={'tab' + (t[0] === on ? ' on' : '')} href={t[0] + '.html'}>
            <Icon name={t[1]} />
            {t[2]}
          </a>
        );
      })}
    </div>
  );
}
function screen(tab, body) {
  return (
    <>
      {sbar()}
      <div className="body">{body}</div>
      {tabbar(tab)}
    </>
  );
}
function back(href, title, right) {
  return (
    <div className="top">
      <div className="top-b">
        <a className="bk" href={href}>
          <Icon name="chevron-left" />
        </a>
        <div className="h2">{title}</div>
      </div>
      {right || ''}
    </div>
  );
}
function chart(p) {
  const W = 342,
    H = 170,
    n = p.history.length + p.forecast.length - 1,
    dx = W / n;
  const y = function (v) {
    return (H - 10 - ((v - 6850) * (H - 20)) / 700).toFixed(1);
  };
  const hi = p.history
    .map(function (v, i) {
      return (i * dx).toFixed(1) + ',' + y(v);
    })
    .join(' ');
  const off = p.history.length - 1;
  const fo = p.forecast
    .map(function (v, i) {
      return ((off + i) * dx).toFixed(1) + ',' + y(v);
    })
    .join(' ');
  const up = p.forecast.map(function (v, i) {
    return ((off + i) * dx).toFixed(1) + ',' + y(v + p.spread[i]);
  });
  const lo = p.forecast
    .map(function (v, i) {
      return ((off + i) * dx).toFixed(1) + ',' + y(v - p.spread[i]);
    })
    .reverse();
  return (
    <div className="chart" data-figma-name="Biểu đồ giá">
      <svg width="342" height="170" viewBox="0 0 342 170">
        <line x1="0" y1="168" x2="342" y2="168" stroke="#E5E7EB" strokeWidth="2" />
        <polygon points={up.concat(lo).join(' ')} fill="#F59E0B" opacity="0.15" />
        <polyline
          points={hi}
          fill="none"
          stroke="#15803D"
          strokeWidth="3"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <polyline
          points={fo}
          fill="none"
          stroke="#F59E0B"
          strokeWidth="3"
          strokeDasharray="7 5"
          strokeLinecap="round"
        />
      </svg>
      <span
        className="ax"
        style={{
          left: '0px',
        }}
      >
        1/10
      </span>
      <span
        className="ax"
        style={{
          left: (off * dx - 16).toFixed(0) + 'px',
        }}
      >
        30/10
      </span>
      <span
        className="ax"
        style={{
          right: '0px',
        }}
      >
        13/11
      </span>
    </div>
  );
}
export const pages = {
  '01-trang-chu': function TrangChu() {
    const f = M.farmer,
      w = M.weather,
      s = M.season;
    const g = [
      ['02-chup-anh', 'camera', 'Chụp lá, biết bệnh'],
      ['04-hoi-dap', 'mic', 'Hỏi bằng giọng nói'],
      ['05-gia-nong-san', 'graph-up-arrow', 'Giá lúa hôm nay'],
      ['06-nhat-ky', 'journal-text', 'Nhật ký mùa vụ'],
    ].map(function (x) {
      return (
        <a key={x[0]} className="cd big" href={x[0] + '.html'}>
          <div className="big-i">
            <Icon name={x[1]} />
          </div>
          {x[2]}
        </a>
      );
    });
    return screen(
      '01-trang-chu',
      <>
        <div
          className="top"
          style={{
            height: '64px',
          }}
        >
          <div>
            <div className="h1">Chào {f.name},</div>
            <div className="sub">{f.farm}</div>
          </div>
          <div className="top-b">
            <div className="ib">
              <Icon name="bell" />
              <span className="rd" />
            </div>
            <a className="ib" href="07-quyen-rieng-tu.html">
              <Icon name="gear" />
            </a>
          </div>
        </div>
        <div className="cd wx" data-figma-name="Thời tiết">
          <div
            style={{
              flex: '1',
            }}
          >
            <div className="wx-t">
              {w.temp} · {w.desc}
            </div>
            <div className="wx-d">{w.advice}</div>
          </div>
          <Icon name="cloud-rain" />
        </div>
        <div className="al" data-figma-name="Cảnh báo dịch">
          <div className="al-t">Cảnh báo dịch: {M.alert}</div>
          <a className="al-l" href="04-hoi-dap.html">
            Xem cách phòng
          </a>
        </div>
        <div className="g22" data-figma-name="Nút chức năng">
          {g}
        </div>
        <div className="cd">
          <div
            style={{
              fontSize: '18px',
              fontWeight: '700',
            }}
          >
            {s.name}
          </div>
          <div className="sub">
            Ngày {s.day}/{s.total} · {s.stage}
          </div>
          <div className="bar">
            <div
              style={{
                width: s.day + '%',
              }}
            />
          </div>
        </div>
      </>,
    );
  },
  '02-chup-anh': function ChupAnh() {
    return (
      <>
        <div className="cam">
          <img src="assets/img/leaf.jpg" alt="" loading="eager" />
          <div
            style={{
              position: 'absolute',
              left: '0px',
              top: '0px',
              width: '390px',
              height: '844px',
              background: 'rgba(17,24,39,0.25)',
            }}
          />
        </div>
        {sbar('dk')}
        <div className="cam-top">
          <a className="ib" href="01-trang-chu.html">
            <Icon name="x-lg" />
          </a>
          <div className="cam-t">Chụp lá bị bệnh</div>
          <div className="ib">
            <Icon name="lightning-charge-fill" />
          </div>
        </div>
        <div className="cc">
          <span className="chipc on">Lúa</span>
          <span className="chipc">Sầu riêng</span>
          <span className="chipc">Xoài</span>
        </div>
        <div className="fr fr-tl" />
        <div className="fr fr-tr" />
        <div className="fr fr-bl" />
        <div className="fr fr-br" />
        <div className="guide">Đưa lá vào giữa khung, đủ sáng, không rung tay</div>
        <div className="cam-bar">
          <div className="gal">
            <img src="assets/img/leaf.jpg" alt="" loading="eager" />
          </div>
          <a className="shot" href="03-ket-qua.html" />
          <a className="vo" href="04-hoi-dap.html">
            <div className="vo-i">
              <Icon name="mic" />
            </div>
            Hỏi bằng giọng nói
          </a>
        </div>
      </>
    );
  },
  '03-ket-qua': function KetQua() {
    const d = M.diagnosis;
    const st = d.steps.map(function (t, i) {
      return (
        <div key={i} className="st">
          <div className="st-n">{i + 1}</div>
          <div>{t}</div>
        </div>
      );
    });
    return screen(
      '02-chup-anh',
      <>
        {back('02-chup-anh.html', 'Kết quả chẩn đoán')}
        <div className="cd dg" data-figma-name="Kết quả">
          <img src="assets/img/leaf.jpg" alt="" loading="eager" />
          <div
            style={{
              flex: '1',
            }}
          >
            <div className="dg-n">{d.disease}</div>
            <div className="cf">Độ tin cậy {d.confidence}%</div>
            <div
              className="bar"
              style={{
                margin: '2px 0 6px',
              }}
            >
              <div
                style={{
                  width: d.confidence + '%',
                }}
              />
            </div>
            <div className="small">Mức độ: {d.severity}</div>
          </div>
        </div>
        <div className="cd" data-figma-name="Nên làm ngay">
          <div
            className="h2"
            style={{
              marginBottom: '4px',
            }}
          >
            Nên làm ngay
          </div>
          {st}
        </div>
        <div className="warn">
          <Icon name="info-circle" />
          <div>Kết quả do AI gợi ý. Hãy hỏi cán bộ khuyến nông trước khi phun thuốc.</div>
        </div>
        <div
          style={{
            display: 'flex',
            gap: '12px',
          }}
        >
          <div
            className="bt bt-o"
            style={{
              flex: '0.8',
            }}
          >
            <Icon name="volume-up" />
            Nghe đọc
          </div>
          <div
            className="bt bt-p"
            style={{
              flex: '1.2',
              fontSize: '19px',
            }}
          >
            <Icon name="telephone" />
            Gọi khuyến nông
          </div>
        </div>
        <a className="lnk" href="06-nhat-ky.html">
          Lưu vào nhật ký
        </a>
      </>,
    );
  },
  '04-hoi-dap': function HoiDap() {
    return screen(
      '04-hoi-dap',
      <>
        <div className="top">
          <div className="h2">Hỏi đáp cùng Nông Trí</div>
        </div>
        <div className="bu">
          <Icon name="volume-up" />
          Lúa tui bị vàng lá ở chân ruộng, có sao không?
        </div>
        <div className="ba">
          Vàng lá ở chân ruộng thường do thiếu đạm hoặc ngộ độc hữu cơ khi ruộng ngập lâu. Chú thử
          rút nước 2–3 ngày rồi bón bổ sung đạm. Nếu lá có đốm nâu viền vàng thì chụp ảnh để Nông
          Trí kiểm tra.
          <div className="src">Nguồn: Tài liệu khuyến nông (dữ liệu mô phỏng)</div>
          <div className="again">
            <Icon name="play-circle" />
            Nghe lại
          </div>
        </div>
        <div className="chp">
          <a href="02-chup-anh.html">Chụp ảnh lá</a>
          <span>Hỏi giá phân bón</span>
        </div>
        <div className="micw">
          <div className="kb">
            <Icon name="keyboard" />
            Gõ chữ
          </div>
          <div>
            <div className="mic-o">
              <div className="mic">
                <Icon name="mic-fill" />
              </div>
            </div>
            <div
              className="small"
              style={{
                textAlign: 'center',
                fontWeight: '700',
                color: '#14532D',
              }}
            >
              Bấm và nói
            </div>
          </div>
          <div
            style={{
              width: '72px',
            }}
          />
        </div>
      </>,
    );
  },
  '05-gia-nong-san': function GiaNongSan() {
    const p = M.prices;
    const tr = M.traders.map(function (t) {
      return (
        <div key={t.name} className="tr">
          <div>
            <div className="tr-n">{t.name}</div>
            <div className="tr-p">
              {vn(t.price)} đ/kg · {t.km} km
            </div>
          </div>
          <div className="call">
            <Icon name="telephone" />
          </div>
        </div>
      );
    });
    return screen(
      '05-gia-nong-san',
      <>
        <div
          className="seg"
          style={{
            marginTop: '4px',
          }}
        >
          <span className="on">Lúa</span>
          <span>Sầu riêng</span>
          <span>Xoài</span>
        </div>
        <div
          className="cd"
          style={{
            padding: '12px 4px 4px',
          }}
        >
          <div
            style={{
              padding: '0 12px',
            }}
          >
            <div className="sub">
              {p.product} · {p.region}
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div className="price">{vn(p.now)} đ/kg</div>
              <div className="up">
                <Icon name="caret-up-fill" />
                {vn(p.delta)} đ
              </div>
            </div>
            <div
              className="small"
              style={{
                marginTop: '-2px',
              }}
            >
              so với tuần trước
            </div>
          </div>
          {chart(p)}
        </div>
        <div
          className="cd fc"
          style={{
            padding: '12px 16px',
          }}
        >
          <Icon name="stars" />
          <div>
            <div
              style={{
                fontSize: '18px',
                lineHeight: '24px',
              }}
            >
              <b>AI dự báo:</b> giá có thể tăng nhẹ 2–4% trong 2 tuần tới. Độ tin cậy: trung bình.
            </div>
            <div
              className="small"
              style={{
                marginTop: '4px',
              }}
            >
              Chỉ mang tính tham khảo, không phải lời khuyên mua bán.
            </div>
          </div>
        </div>
        <div
          className="cd"
          style={{
            padding: '4px 16px',
          }}
        >
          {tr}
        </div>
      </>,
    );
  },
  '06-nhat-ky': function NhatKy() {
    const tl = M.diary.map(function (d, i) {
      const inner = (
        <>
          <div
            className="dotc"
            style={{
              background: d.color,
            }}
          />
          <div>
            <div className="tl-d">{d.date}</div>
            <div className="tl-x">{d.text}</div>
          </div>
        </>
      );
      return d.link ? (
        <a key={i} className="tlv" href={d.link}>
          {inner}
        </a>
      ) : (
        <div key={i} className="tlv">
          {inner}
        </div>
      );
    });
    return screen(
      '06-nhat-ky',
      <>
        {back(
          '01-trang-chu.html',
          'Nhật ký mùa vụ',
          <a className="ib" href="07-quyen-rieng-tu.html">
            <Icon name="gear" />
          </a>,
        )}
        <div className="cd" data-figma-name="Tổng kết">
          <div className="sum">
            <div>
              <div className="small">Chi phí đã chi</div>
              <b>{M.cost}</b>
            </div>
            <div>
              <div className="small">Dự kiến thu</div>
              <b>{M.revenue}</b>
            </div>
          </div>
          <div
            style={{
              marginTop: '8px',
              fontSize: '18px',
              fontWeight: '700',
              color: '#15803D',
            }}
          >
            Lợi nhuận ước tính: {M.profit}
          </div>
        </div>
        <div
          className="cd"
          style={{
            flex: '1',
          }}
        >
          <div
            className="h2"
            style={{
              marginBottom: '6px',
            }}
          >
            Dòng thời gian
          </div>
          {tl}
        </div>
        <div
          className="bt bt-p"
          style={{
            flex: 'none',
          }}
        >
          <Icon name="mic" />
          Ghi nhật ký bằng giọng nói
        </div>
      </>,
    );
  },
  '07-quyen-rieng-tu': function QuyenRiengTu() {
    const sw = function (t, on) {
      return (
        <div className="cd sw-r">
          <div>{t}</div>
          <div className={'swt' + (on ? ' on' : '')}>
            <i />
          </div>
        </div>
      );
    };
    return screen(
      '06-nhat-ky',
      <>
        {back('01-trang-chu.html', 'Quyền riêng tư')}
        <div
          className="sub"
          style={{
            fontSize: '18px',
            lineHeight: '26px',
          }}
        >
          Chú quyết định dữ liệu nào được chia sẻ. Có thể đổi bất cứ lúc nào.
        </div>
        {sw('Chia sẻ ảnh lá (ẩn danh) để AI học tốt hơn', true)}
        {sw('Chia sẻ vị trí ruộng để nhận cảnh báo dịch', true)}
        {sw('Cho cán bộ khuyến nông xem nhật ký', false)}
        <div className="cd sec">
          <Icon name="shield-lock" />
          <div
            style={{
              fontSize: '17px',
              lineHeight: '24px',
            }}
          >
            Dữ liệu được mã hóa và lưu trên máy chủ đặt tại Việt Nam. Nông Trí không bán dữ liệu cho
            bên thứ ba.
          </div>
        </div>
        <div
          className="bt bt-o"
          style={{
            flex: 'none',
          }}
        >
          <Icon name="download" />
          Tải dữ liệu của tôi
        </div>
        <div
          className="bt bt-d"
          style={{
            flex: 'none',
          }}
        >
          <Icon name="trash3" />
          Xóa toàn bộ dữ liệu
        </div>
      </>,
    );
  },
};
