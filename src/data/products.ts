import { Product } from '../types/Product';

export const CATALOG: Product[] = [
  { id: '1', title: 'Laptop HP Core i7', category: 'Electrónica', barcode: '111111', imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300', expectedStock: 10, unitPrice: 850 },
  { id: '2', title: 'Monitor Dell 24"', category: 'Electrónica', barcode: '222222', imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300', expectedStock: 25, unitPrice: 150 },
  { id: '3', title: 'Teclado Mecánico', category: 'Accesorios', barcode: '333333', imageUrl: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=300', expectedStock: 40, unitPrice: 45 },
  { id: '4', title: 'Mouse Logitech', category: 'Accesorios', barcode: '444444', imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300', expectedStock: 50, unitPrice: 25 },
  { id: '5', title: 'Cable HDMI 2m', category: 'Cables', barcode: '555555', imageUrl: 'https://images.unsplash.com/photo-1538370621607-4919ce7889b3?w=300', expectedStock: 100, unitPrice: 10 },
  { id: '6', title: 'Disco Duro 1TB', category: 'Almacenamiento', barcode: '666666', imageUrl: 'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=300', expectedStock: 30, unitPrice: 60 },
  { id: '7', title: 'Memoria RAM 16GB', category: 'Componentes', barcode: '777777', imageUrl: 'https://images.unsplash.com/photo-1542978709-19c95dc3bc7e?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', expectedStock: 45, unitPrice: 55 },
  { id: '8', title: 'Silla Ergonómica', category: 'Mobiliario', barcode: '888888', imageUrl: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=300', expectedStock: 15, unitPrice: 120 },
  { id: '9', title: 'Escritorio L', category: 'Mobiliario', barcode: '999999', imageUrl: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=300', expectedStock: 8, unitPrice: 200 },
  { id: '10', title: 'Audífonos Bluetooth', category: 'Audio', barcode: '101010', imageUrl: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=300', expectedStock: 60, unitPrice: 35 },
  { id: '11', title: 'Impresora Láser', category: 'Oficina', barcode: '112233', imageUrl: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=300', expectedStock: 12, unitPrice: 180 },
  { id: '12', title: 'Tóner Negro', category: 'Oficina', barcode: '223344', imageUrl: 'https://media.istockphoto.com/id/1249120844/es/foto/el-hombre-est%C3%A1-reemplazando-cartucho-negro-en-una-impresora-l%C3%A1ser.webp?a=1&b=1&s=612x612&w=0&k=20&c=V0COvn-ySzpELox181XjQUGKE3AdsqHp-EWQX_jd2uc=', expectedStock: 40, unitPrice: 50 },
  { id: '13', title: 'Webcam 1080p', category: 'Accesorios', barcode: '334455', imageUrl: 'https://images.unsplash.com/photo-1599839619722-39751411ea63?w=300', expectedStock: 20, unitPrice: 40 },
  { id: '14', title: 'Router Wi-Fi 6', category: 'Redes', barcode: '445566', imageUrl: 'https://media.istockphoto.com/id/2254452461/es/foto/router-inal%C3%A1mbrico.webp?a=1&b=1&s=612x612&w=0&k=20&c=41wkuPbYbSzBJfN7ru6vXzZ2H0yRlg3k602VuOYPZ-Y=', expectedStock: 18, unitPrice: 90 },
  { id: '15', title: 'Switch 24 Puertos', category: 'Redes', barcode: '556677', imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=300', expectedStock: 5, unitPrice: 250 },
];