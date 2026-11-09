// Toàn bộ dữ liệu là MÔ PHỎNG phục vụ bài tập thiết kế UX. Chú Tư là nhân vật giả định.
export default {
  farmer: { name: 'chú Tư', farm: 'Ruộng lúa 2,5 ha · Châu Thành, Đồng Tháp' },
  weather: {
    temp: '31°C',
    desc: 'Có mây',
    advice: 'Chiều nay mưa rào (70%). Không nên phun thuốc hôm nay.',
  },
  alert: 'Rầy nâu tăng mạnh ở xã An Nhơn (cách 3 km).',
  season: {
    name: 'Vụ Đông Xuân 2026–2027',
    day: 45,
    total: 100,
    stage: 'Giai đoạn làm đòng',
  },
  diagnosis: {
    disease: 'Bệnh đạo ôn lá',
    confidence: 91,
    severity: 'Trung bình · khoảng 15% diện tích lá',
    steps: [
      'Rút nước, giữ ruộng ẩm.',
      'Tạm ngưng bón đạm.',
      'Phun thuốc có hoạt chất Tricyclazole theo đúng liều trên nhãn.',
    ],
  },
  prices: {
    product: 'Lúa OM18 (tươi)',
    region: 'Đồng Tháp',
    now: 7200,
    delta: 150,
    history: [
      6950, 6930, 6920, 6940, 6960, 6990, 6980, 6960, 6940, 6970, 7000, 7020,
      7010, 6990, 7020, 7050, 7040, 7060, 7080, 7050, 7030, 7060, 7090, 7110,
      7100, 7130, 7150, 7120, 7170, 7200,
    ],
    forecast: [
      7200, 7210, 7225, 7235, 7250, 7270, 7285, 7300, 7320, 7335, 7355, 7375,
      7400, 7420,
    ],
    spread: [0, 15, 25, 35, 45, 55, 65, 75, 85, 95, 105, 115, 125, 135],
  },
  traders: [
    { name: 'Vựa lúa Bảy Hòa', price: 7250, km: 4 },
    { name: 'Vựa Hai Lúa', price: 7200, km: 6 },
    { name: 'HTX Thạnh Phú', price: 7180, km: 9 },
  ],
  diary: [
    { date: '01/12', text: 'Gieo sạ', color: '#15803D' },
    { date: '20/12', text: 'Bón phân đợt 1 · 2,1 triệu', color: '#F59E0B' },
    {
      date: '09/01',
      text: 'AI chẩn đoán: đạo ôn lá (91%)',
      color: '#EA580C',
      link: '03-ket-qua.html',
    },
    {
      date: '10/01',
      text: 'Phun thuốc theo hướng dẫn · 650.000 đ',
      color: '#B91C1C',
    },
  ],
  cost: '18,4 triệu',
  revenue: '42 triệu',
  profit: '23,6 triệu',
};
