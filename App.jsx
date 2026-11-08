```react
import React, { useState, useEffect, useMemo } from 'react';
import { 
  MapPin, ShoppingBag, Plus, Minus, Trash2, ChevronRight, X, Phone, 
  Clock, CheckCircle, Settings, Edit2, Lock, ArrowRight, Menu as MenuIcon,
  ShoppingBasket, AlertCircle, RefreshCw, Layers, ShieldCheck, Heart
} from 'lucide-react';

// --- INITIAL BRANCH DATA (ATYRAU, KAZAKHSTAN) ---
const INITIAL_BRANCHES = [
  {
    id: 1,
    name: 'APORT ASHANA — Азаттық даңғылы',
    address: 'Азаттық даңғылы, 67, Атырау',
    hours: '08:00 - 23:00',
    coords: [47.1064, 51.9134],
    phone: '+7 778 580 2308'
  },
  {
    id: 2,
    name: 'APORT ASHANA — Сәтпаев көшесі',
    address: 'Сәтпаев көшесі, 18, Атырау',
    hours: '09:00 - 24:00',
    coords: [47.0982, 51.9012],
    phone: '+7 778 580 2308'
  },
  {
    id: 3,
    name: 'APORT ASHANA — Нұрсая мөлтек ауданы',
    address: 'Нұрсая м/а, 11-үй, Атырау',
    hours: '08:30 - 22:30',
    coords: [47.1215, 51.9380],
    phone: '+7 778 580 2308'
  },
  {
    id: 4,
    name: 'APORT ASHANA — Авангард',
    address: 'Авангард 2-м/а, 4А, Атырау',
    hours: '08:00 - 23:00',
    coords: [47.0850, 51.8845],
    phone: '+7 778 580 2308'
  },
  {
    id: 5,
    name: 'APORT ASHANA — Балықшы',
    address: 'Құнанбаев көшесі, 22, Атырау',
    hours: '09:00 - 23:00',
    coords: [47.0620, 51.8620],
    phone: '+7 778 580 2308'
  }
];

// --- INITIAL FOOD PRODUCTS ---
const INITIAL_PRODUCTS = [
  // НЕГІЗГІ ТАҒАМДАР
  {
    id: 'm1',
    category: 'НЕГІЗГІ ТАҒАМДАР',
    name: 'Плов',
    price: 1550,
    weight: '300 гр',
    image: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&q=80&w=600',
    description: 'Дәмді өзбекше плов, сиыр еті мен сәбіз косылған',
    available: true
  },
  {
    id: 'm2',
    category: 'НЕГІЗГІ ТАҒАМДАР',
    name: 'Жаренный лагман',
    price: 1800,
    weight: '300 гр',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=600',
    description: 'Қолдан созылған лапша, көкөністер және етпен қуырылған',
    available: true
  },
  {
    id: 'm3',
    category: 'НЕГІЗГІ ТАҒАМДАР',
    name: 'Бешбармақ',
    price: 2050,
    weight: '400 гр',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600',
    description: 'Дәстүрлі қазақ бешбармағы, жұқа жайма және нәзік ет',
    available: true
  },
  {
    id: 'm4',
    category: 'НЕГІЗГІ ТАҒАМДАР',
    name: 'Манты',
    price: 1600,
    weight: '5 дана',
    image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&q=80&w=600',
    description: 'Буда піскен шырынды сиыр еті мантысы',
    available: true
  },
  {
    id: 'm5',
    category: 'НЕГІЗГІ ТАҒАМДАР',
    name: 'Қуырдақ',
    price: 2200,
    weight: '350 гр',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600',
    description: 'Жас еттен дайындалған хош иісті қуырдақ',
    available: true
  },
  {
    id: 'm6',
    category: 'НЕГІЗГІ ТАҒАМДАР',
    name: 'Котлет с пюре',
    price: 1700,
    weight: '350 гр',
    image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&q=80&w=600',
    description: 'Үй стиліндегі жұмсақ котлет және картоп пюресі',
    available: true
  },

  // ГАРНИРЛЕР
  {
    id: 'g1',
    category: 'ГАРНИРЛЕР',
    name: 'Рис',
    price: 320,
    weight: '150 гр',
    image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&q=80&w=600',
    description: 'Буға піскен аппақ ақ күріш',
    available: true
  },
  {
    id: 'g2',
    category: 'ГАРНИРЛЕР',
    name: 'Гречка',
    price: 400,
    weight: '150 гр',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=600',
    description: 'Сары маймен пісірілген қарамық',
    available: true
  },
  {
    id: 'g3',
    category: 'ГАРНИРЛЕР',
    name: 'Ризотта',
    price: 450,
    weight: '150 гр',
    image: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&q=80&w=600',
    description: 'Кілегейлі ризотто күріші',
    available: true
  },

  // ТАУЫҚ ЕТТЕРІ
  {
    id: 'c1',
    category: 'ТАУЫҚ ЕТТЕРІ',
    name: 'Курица в томатном соусе',
    price: 1200,
    weight: '150 гр',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=600',
    description: '120 гр қою бөлігі, 30 гр сұйық томат соусы',
    available: true
  },
  {
    id: 'c2',
    category: 'ТАУЫҚ ЕТТЕРІ',
    name: 'Курица кисло-сладкий',
    price: 1150,
    weight: '150 гр',
    image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&q=80&w=600',
    description: '120 гр қою бөлігі, 30 гр қышқыл-тәтті соус',
    available: true
  },

  // СОРПАЛАР
  {
    id: 's1',
    category: 'СОРПАЛАР',
    name: 'Кеспе',
    price: 1400,
    weight: '350 гр',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=600',
    description: 'Үй кеспесі, тауық сорпасы мен ет',
    available: true
  },
  {
    id: 's2',
    category: 'СОРПАЛАР',
    name: 'Сорпа',
    price: 1200,
    weight: '350 гр',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=600',
    description: 'Қою сиыр еті сорпасы',
    available: true
  },

  // САЛАТТАР
  {
    id: 'sl1',
    category: 'САЛАТТАР',
    name: 'Оливье салаты',
    price: 900,
    weight: '200 гр',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=600',
    description: 'Дәстүрлі Оливье салаты',
    available: true
  },
  {
    id: 'sl2',
    category: 'САЛАТТАР',
    name: 'Свежий салат',
    price: 800,
    weight: '200 гр',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600',
    description: 'Қияр, қияр, өсімдік майы қосылған балғын салат',
    available: true
  },

  // СУСЫНДАР
  {
    id: 'd1',
    category: 'СУСЫНДАР',
    name: 'Компот',
    price: 400,
    weight: '0.5 л',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=600',
    description: 'Үйде дайындалған табиғи жеміс компоты',
    available: true
  },
  {
    id: 'd2',
    category: 'СУСЫНДАР',
    name: 'Морс',
    price: 450,
    weight: '0.5 л',
    image: 'https://images.unsplash.com/photo-1546171753-97d7676e4602?auto=format&fit=crop&q=80&w=600',
    description: 'Бүлдірген мен жидектерден жасалған сергіткіш морс',
    available: true
  },
  {
    id: 'd3',
    category: 'СУСЫНДАР',
    name: 'Coca-Cola',
    price: 500,
    weight: '0.5 л',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=600',
    description: 'Салқындатылған Coca-Cola',
    available: true
  },
  {
    id: 'd4',
    category: 'СУСЫНДАР',
    name: 'Fanta',
    price: 500,
    weight: '0.5 л',
    image: 'https://images.unsplash.com/photo-1624517452488-04869289c4ca?auto=format&fit=crop&q=80&w=600',
    description: 'Апельсин дәмі бар Fanta',
    available: true
  },
  {
    id: 'd5',
    category: 'СУСЫНДАР',
    name: 'Sprite',
    price: 500,
    weight: '0.5 л',
    image: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&q=80&w=600',
    description: 'Лимон-лайм салқын сусыны',
    available: true
  },
  {
    id: 'd6',
    category: 'СУСЫНДАР',
    name: 'Айран',
    price: 400,
    weight: '0.5 л',
    image: 'https://images.unsplash.com/photo-1528751014936-863e6e7a319c?auto=format&fit=crop&q=80&w=600',
    description: 'Ұлттық салқын айран',
    available: true
  },
  {
    id: 'd7',
    category: 'СУСЫНДАР',
    name: 'Шай',
    price: 300,
    weight: '1 л',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=600',
    description: 'Қою сүтті қазақша шай',
    available: true
  },
  {
    id: 'd8',
    category: 'СУСЫНДАР',
    name: 'Су',
    price: 250,
    weight: '0.5 л',
    image: 'https://images.unsplash.com/photo-1560023907-5f339617ea30?auto=format&fit=crop&q=80&w=600',
    description: 'Табиғи газдалмаған су',
    available: true
  }
];

const CATEGORIES = [
  'НЕГІЗГІ ТАҒАМДАР',
  'КОМБО ТАҒАМДАР',
  'ГАРНИРЛЕР',
  'ТАУЫҚ ЕТТЕРІ',
  'САЛАТТАР',
  'СОРПАЛАР',
  'СУСЫНДАР'
];

export default function App() {
  // State management
  const [selectedBranch, setSelectedBranch] = useState(() => {
    const saved = localStorage.getItem('aport_selected_branch');
    return saved ? JSON.parse(saved) : null;
  });

  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('aport_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [branches, setBranches] = useState(() => {
    const saved = localStorage.getItem('aport_branches');
    return saved ? JSON.parse(saved) : INITIAL_BRANCHES;
  });

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('aport_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [activeCategory, setActiveCategory] = useState('НЕГІЗГІ ТАҒАМДАР');
  const [isTrayOpen, setIsTrayOpen] = useState(false); // Mobile tray slide
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState('');

  // Combination system state
  const [selectedGarnish, setSelectedGarnish] = useState(null);
  const [selectedChicken, setSelectedChicken] = useState(null);

  // Order form state
  const [orderForm, setOrderForm] = useState({
    name: '',
    phone: '',
    address: '',
    orderType: 'delivery', // 'delivery' | 'pickup'
    comment: ''
  });

  // Touch handlers for mobile left swipe trigger
  const [touchStartX, setTouchStartX] = useState(null);

  useEffect(() => {
    if (selectedBranch) {
      localStorage.setItem('aport_selected_branch', JSON.stringify(selectedBranch));
    }
  }, [selectedBranch]);

  useEffect(() => {
    localStorage.setItem('aport_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('aport_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('aport_branches', JSON.stringify(branches));
  }, [branches]);

  // Derived arrays for combo system
  const garnishes = useMemo(() => products.filter(p => p.category === 'ГАРНИРЛЕР' && p.available), [products]);
  const chickens = useMemo(() => products.filter(p => p.category === 'ТАУЫҚ ЕТТЕРІ' && p.available), [products]);

  // Cart operations
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.cartId === product.id);
      if (existing) {
        return prev.map(item => 
          item.cartId === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, {
        cartId: product.id,
        isCombo: false,
        name: product.name,
        price: product.price,
        image: product.image,
        weight: product.weight,
        quantity: 1
      }];
    });
  };

  const addComboToCart = () => {
    if (!selectedGarnish || !selectedChicken) return;
    const comboId = `combo-${selectedGarnish.id}-${selectedChicken.id}`;
    const comboPrice = selectedGarnish.price + selectedChicken.price;
    const comboName = `${selectedGarnish.name} + ${selectedChicken.name}`;

    setCart(prev => {
      const existing = prev.find(item => item.cartId === comboId);
      if (existing) {
        return prev.map(item => 
          item.cartId === comboId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, {
        cartId: comboId,
        isCombo: true,
        name: comboName,
        garnishName: selectedGarnish.name,
        garnishPrice: selectedGarnish.price,
        chickenName: selectedChicken.name,
        chickenPrice: selectedChicken.price,
        price: comboPrice,
        image: selectedChicken.image,
        garnishImage: selectedGarnish.image,
        quantity: 1
      }];
    });
  };

  const updateQuantity = (cartId, delta) => {
    setCart(prev => prev.map(item => {
      if (item.cartId === cartId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const removeFromCart = (cartId) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  };

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, [cart]);

  const totalItemCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  // Touch swipe detection for mobile drawer
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    // Swipe Left to open tray
    if (diff > 60 && !isTrayOpen) {
      setIsTrayOpen(true);
    }
    // Swipe Right to close tray
    if (diff < -60 && isTrayOpen) {
      setIsTrayOpen(false);
    }
    setTouchStartX(null);
  };

  // WhatsApp Order Generator
  const handleSendWhatsAppOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    let itemsText = cart.map((item, index) => {
      if (item.isCombo) {
        return `${index + 1}. ${item.name} (${item.quantity}x):\n   - ${item.garnishName} — ${item.garnishPrice}₸\n   - ${item.chickenName} — ${item.chickenPrice}₸\n   - Комплект сомасы: ${item.price * item.quantity}₸`;
      }
      return `${index + 1}. ${item.name} × ${item.quantity} — ${item.price * item.quantity}₸`;
    }).join('\n\n');

    const message = `Сәлеметсіз бе! ❤️\nAPORT ASHANA-дан тапсырыс!\n\n📍 Филиал: ${selectedBranch ? selectedBranch.name : 'Таңдалмаған'}\n\n👤 Аты-жөні: ${orderForm.name}\n📞 Телефон: ${orderForm.phone}\n📍 Мекенжай: ${orderForm.orderType === 'delivery' ? orderForm.address : 'Өзі алып кету'}\n🚚 Тапсырыс түрі: ${orderForm.orderType === 'delivery' ? 'Жеткізу' : 'Өзі алып кету'}\n\n🛒 ТАПСЫРЫС:\n\n${itemsText}\n\n💰 ЖАЛПЫ СОММА: ${cartTotal}₸\n\n📝 Қосымша: ${orderForm.comment || 'Жоқ'}\n\nAPORT ASHANA ❤️`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/77785802308?text=${encoded}`, '_blank');
    setShowOrderModal(false);
  };

  // Admin login logic
  const handleAdminAuth = (e) => {
    e.preventDefault();
    if (adminPassword === 'aport2026' || adminPassword === 'admin') {
      setIsAdminLoggedIn(true);
      setAdminError('');
    } else {
      setAdminError('Қате құпия сөз!');
    }
  };

  return (
    <div 
      className="min-h-screen bg-[#1F1410] text-[#FDF8F5] font-sans flex flex-col selection:bg-[#D4AF37] selection:text-[#1F1410]"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* HEADER NAVBAR */}
      <header className="sticky top-0 z-40 bg-[#2A1B15]/95 backdrop-blur-md border-b border-[#3D291F] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setSelectedBranch(null)}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#F3E5AB] flex items-center justify-center text-[#1F1410] font-black text-xl shadow-md border border-[#F3E5AB]">
              A
            </div>
            <div>
              <h1 className="font-bold text-lg leading-none tracking-wide text-[#F3E5AB]">APORT ASHANA</h1>
              <p className="text-[10px] text-[#D4AF37] uppercase tracking-widest font-semibold mt-0.5">ЖЕДЕЛ ТАМАҚ ЖЕТКІЗУ ❤️</p>
            </div>
          </div>

          {/* Active Branch Display / Change */}
          {selectedBranch && (
            <div className="hidden md:flex items-center bg-[#1F1410] px-3 py-1.5 rounded-full border border-[#3D291F] text-xs">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37] mr-1.5 shrink-0" />
              <span className="text-gray-300 truncate max-w-[220px]">{selectedBranch.name}</span>
              <button 
                onClick={() => setSelectedBranch(null)} 
                className="ml-2 text-[#D4AF37] hover:underline font-medium text-[11px]"
              >
                Ауыстыру
              </button>
            </div>
          )}

          {/* Actions: Admin & Mobile Cart Trigger */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowAdminModal(true)}
              className="p-2 text-gray-400 hover:text-[#D4AF37] transition-colors rounded-lg bg-[#1F1410] border border-[#3D291F]"
              title="Админ панелі"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Mobile Tray Button */}
            <button
              onClick={() => setIsTrayOpen(true)}
              className="lg:hidden relative bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-[#1F1410] font-bold px-3 py-1.5 rounded-full flex items-center space-x-2 text-sm shadow-md"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Поднос</span>
              {totalItemCount > 0 && (
                <span className="bg-[#1F1410] text-[#F3E5AB] text-xs px-2 py-0.5 rounded-full">
                  {totalItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* STEP 1: BRANCH SELECTION & ATYRAU MAP PAGE */}
      {!selectedBranch ? (
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 md:p-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="inline-block px-3 py-1 bg-[#3D291F] text-[#D4AF37] text-xs font-semibold rounded-full tracking-wider uppercase mb-3 border border-[#52382B]">
              Атырау қаласы
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#F3E5AB] tracking-tight">
              ФИЛИАЛДЫ ТАҢДАҢЫЗ
            </h2>
            <p className="text-sm sm:text-base text-gray-300 mt-2">
              Тапсырысты бастау үшін өзіңізге ең жақын APORT ASHANA филиалын таңдаңыз
            </p>
          </div>

          {/* Interactive Map Component Placeholder / SVG Map Mock */}
          <div className="bg-[#2A1B15] rounded-2xl border border-[#3D291F] overflow-hidden shadow-2xl mb-8">
            <div className="relative w-full h-72 sm:h-96 bg-[#160E0B] p-4 flex flex-col justify-between overflow-hidden">
              {/* Decorative map grid graphics */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px]"></div>
              
              <div className="relative z-10 flex justify-between items-start">
                <div className="bg-[#1F1410]/90 backdrop-blur border border-[#3D291F] p-3 rounded-lg max-w-xs">
                  <p className="text-xs font-bold text-[#F3E5AB]">Атырау картасы</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">Барлық 5 филиал жұмыс істеп тұр</p>
                </div>
              </div>

              {/* Simulated Map Pins */}
              <div className="relative z-10 grid grid-cols-2 sm:grid-cols-5 gap-3 my-auto py-4">
                {branches.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setSelectedBranch(b)}
                    className="group flex flex-col items-center text-center p-3 rounded-xl bg-[#2A1B15]/90 border border-[#3D291F] hover:border-[#D4AF37] hover:scale-105 transition-all shadow-md"
                  >
                    <div className="w-9 h-9 rounded-full bg-[#D4AF37] text-[#1F1410] flex items-center justify-center font-bold mb-2 group-hover:bg-[#F3E5AB]">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-[#F3E5AB] line-clamp-1">{b.name.replace('APORT ASHANA — ', '')}</span>
                    <span className="text-[10px] text-gray-400 mt-1 line-clamp-1">{b.address}</span>
                  </button>
                ))}
              </div>

              <div className="relative z-10 text-center text-xs text-gray-400">
                💡 Картадан немесе төмендегі тізімнен филиалды таңдаңыз
              </div>
            </div>
          </div>

          {/* Branch List Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {branches.map((branch) => (
              <div 
                key={branch.id} 
                className="bg-[#2A1B15] border border-[#3D291F] hover:border-[#D4AF37]/50 rounded-xl p-5 flex flex-col justify-between transition-all hover:shadow-lg"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <h3 className="font-bold text-base text-[#F3E5AB] mb-1">{branch.name}</h3>
                    <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded-full font-medium">Ашық</span>
                  </div>
                  <p className="text-xs text-gray-300 flex items-center mt-2">
                    <MapPin className="w-3.5 h-3.5 text-[#D4AF37] mr-1.5 shrink-0" />
                    {branch.address}
                  </p>
                  <p className="text-xs text-gray-400 flex items-center mt-1.5">
                    <Clock className="w-3.5 h-3.5 text-gray-400 mr-1.5 shrink-0" />
                    {branch.hours}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedBranch(branch)}
                  className="mt-5 w-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B] hover:from-[#F3E5AB] hover:to-[#D4AF37] text-[#1F1410] font-bold py-2.5 px-4 rounded-lg text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-1 shadow-md"
                >
                  <span>ОСЫ ФИЛИАЛДЫ ТАҢДАУ</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </main>
      ) : (
        /* STEP 2: RESTAURANT MENU & TRAY LAYOUT */
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:flex lg:gap-8 relative">
          
          {/* MENU COLUMN (LEFT) */}
          <div className="flex-1 min-w-0">
            
            {/* BRAND WELCOME BANNER */}
            <div className="bg-gradient-to-r from-[#2A1B15] via-[#3D291F] to-[#2A1B15] border border-[#3D291F] rounded-2xl p-6 mb-6 text-center shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest block mb-1">
                  Атырау • {selectedBranch.name}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#F3E5AB] tracking-wide">
                  ҚОШ КЕЛДІҢІЗ ❤️
                </h2>
                <p className="text-base sm:text-lg font-bold text-gray-200 mt-1">
                  БІЗДІҢ МӘЗІР
                </p>
              </div>
            </div>

            {/* CATEGORY NAV BAR */}
            <div className="sticky top-[61px] z-30 bg-[#1F1410]/95 backdrop-blur-md py-3 -mx-4 px-4 sm:mx-0 sm:px-0 mb-6 overflow-x-auto no-scrollbar border-b border-[#3D291F]">
              <div className="flex space-x-2 min-w-max">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                      activeCategory === cat
                        ? 'bg-[#D4AF37] text-[#1F1410] shadow-md scale-105'
                        : 'bg-[#2A1B15] text-gray-300 hover:text-[#F3E5AB] border border-[#3D291F]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* SPECIAL FUNCTION 4: COMBO BUILDER SYSTEM (REFERENCE IMAGE 1) */}
            {activeCategory === 'КОМБО ТАҒАМДАР' && (
              <div className="bg-[#2A1B15] border-2 border-[#D4AF37]/40 rounded-2xl p-4 sm:p-6 mb-8 shadow-2xl">
                <div className="text-center mb-6">
                  <span className="bg-[#D4AF37]/20 text-[#D4AF37] text-[11px] font-bold px-3 py-1 rounded-full border border-[#D4AF37]/30 uppercase tracking-wider">
                    Интерактивті Комботұрғыш
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#F3E5AB] mt-2">
                    ӨЗ КОМБОҢДЫ ЖАҢАДАН ЖАҢАРТ!
                  </h3>
                  <p className="text-xs text-gray-300 mt-1">
                    Кез келген гарнирді кез келген тауық етімен біріктіріңіз
                  </p>
                </div>

                {/* 3-PART COMBO VISUAL INTERFACE */}
                <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 items-center">
                  
                  {/* PART 1: GARNISH SELECTOR */}
                  <div className="lg:col-span-3 bg-[#1F1410] p-4 rounded-xl border border-[#3D291F]">
                    <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-3 text-center">
                      1. Гарнирді таңдаңыз
                    </h4>
                    <div className="space-y-2">
                      {garnishes.map((g) => (
                        <div
                          key={g.id}
                          onClick={() => setSelectedGarnish(g)}
                          className={`flex items-center justify-between p-2.5 rounded-lg border cursor-pointer transition-all ${
                            selectedGarnish?.id === g.id
                              ? 'bg-[#3D291F] border-[#D4AF37] text-[#F3E5AB]'
                              : 'bg-[#2A1B15] border-[#3D291F] text-gray-300 hover:border-gray-500'
                          }`}
                        >
                          <div className="flex items-center space-x-2.5">
                            <img src={g.image} alt={g.name} className="w-10 h-10 rounded-md object-cover" />
                            <div>
                              <p className="text-xs font-bold">{g.name}</p>
                              <p className="text-[10px] text-gray-400">{g.weight}</p>
                            </div>
                          </div>
                          <span className="text-xs font-extrabold text-[#D4AF37]">{g.price}₸</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* PLUS ICON */}
                  <div className="lg:col-span-1 flex items-center justify-center py-2">
                    <div className="w-8 h-8 rounded-full bg-[#D4AF37] text-[#1F1410] flex items-center justify-center font-black text-lg shadow-md">
                      +
                    </div>
                  </div>

                  {/* PART 2: CHICKEN SELECTOR */}
                  <div className="lg:col-span-3 bg-[#1F1410] p-4 rounded-xl border border-[#3D291F]">
                    <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-3 text-center">
                      2. Тауық етін таңдаңыз
                    </h4>
                    <div className="space-y-2">
                      {chickens.map((c) => (
                        <div
                          key={c.id}
                          onClick={() => setSelectedChicken(c)}
                          className={`flex items-center justify-between p-2.5 rounded-lg border cursor-pointer transition-all ${
                            selectedChicken?.id === c.id
                              ? 'bg-[#3D291F] border-[#D4AF37] text-[#F3E5AB]'
                              : 'bg-[#2A1B15] border-[#3D291F] text-gray-300 hover:border-gray-500'
                          }`}
                        >
                          <div className="flex items-center space-x-2.5">
                            <img src={c.image} alt={c.name} className="w-10 h-10 rounded-md object-cover" />
                            <div>
                              <p className="text-xs font-bold">{c.name}</p>
                              <p className="text-[10px] text-gray-400">{c.weight}</p>
                            </div>
                          </div>
                          <span className="text-xs font-extrabold text-[#D4AF37]">{c.price}₸</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* RESULTING COMBINATION SUMMARY CARD */}
                <div className="mt-6 pt-6 border-t border-[#3D291F] bg-[#1F1410]/80 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex -space-x-3 overflow-hidden">
                      <img 
                        src={selectedGarnish ? selectedGarnish.image : 'https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&q=80&w=200'} 
                        className="inline-block h-14 w-14 rounded-full ring-2 ring-[#D4AF37] object-cover" 
                        alt="Garnish"
                      />
                      <img 
                        src={selectedChicken ? selectedChicken.image : 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=200'} 
                        className="inline-block h-14 w-14 rounded-full ring-2 ring-[#D4AF37] object-cover" 
                        alt="Chicken"
                      />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium">Дайын комбо:</p>
                      <h4 className="text-sm font-bold text-[#F3E5AB]">
                        {selectedGarnish && selectedChicken 
                          ? `${selectedGarnish.name} + ${selectedChicken.name}`
                          : 'Гарнир мен Тауық етін таңдаңыз'}
                      </h4>
                      <p className="text-xs text-gray-300 mt-0.5">
                        {selectedGarnish && selectedChicken 
                          ? `${selectedGarnish.price}₸ + ${selectedChicken.price}₸` 
                          : 'Жиынтық бағасы'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="text-right">
                      <span className="text-[10px] text-gray-400 block uppercase">Барлығы</span>
                      <span className="text-xl font-black text-[#D4AF37]">
                        {selectedGarnish && selectedChicken ? selectedGarnish.price + selectedChicken.price : 0}₸
                      </span>
                    </div>

                    <button
                      disabled={!selectedGarnish || !selectedChicken}
                      onClick={addComboToCart}
                      className="bg-gradient-to-r from-[#D4AF37] to-[#B8860B] disabled:opacity-50 hover:from-[#F3E5AB] text-[#1F1410] font-bold px-5 py-2.5 rounded-lg text-xs uppercase tracking-wider transition-all shadow-md flex items-center space-x-1"
                    >
                      <Plus className="w-4 h-4" />
                      <span>ПОДНОСҚА ҚОСУ</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* PRODUCT MENU GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {products
                .filter(p => p.category === activeCategory && p.available)
                .map((product) => (
                  <div
                    key={product.id}
                    className="bg-[#2A1B15] border border-[#3D291F] hover:border-[#D4AF37]/50 rounded-xl overflow-hidden flex flex-col justify-between transition-all hover:shadow-xl group"
                  >
                    <div>
                      <div className="relative h-44 w-full overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute top-2 right-2 bg-[#1F1410]/90 border border-[#3D291F] text-[#F3E5AB] text-[11px] font-bold px-2 py-0.5 rounded-full backdrop-blur">
                          {product.weight}
                        </span>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-base text-[#F3E5AB] group-hover:text-[#D4AF37] transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                          {product.description}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 pt-0 flex items-center justify-between mt-2">
                      <span className="text-lg font-black text-[#D4AF37]">{product.price}₸</span>
                      <button
                        onClick={() => addToCart(product)}
                        className="bg-[#3D291F] hover:bg-[#D4AF37] hover:text-[#1F1410] text-[#F3E5AB] font-semibold px-3 py-1.5 rounded-lg text-xs transition-all flex items-center space-x-1 border border-[#52382B]"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>ҚОСУ</span>
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* RIGHT COLUMN: PREMIUM SHOPPING TRAY — ҚОҢЫР ПОДНОС (REFERENCE IMAGE 2) */}
          <aside className={`
            fixed lg:sticky top-0 lg:top-[77px] right-0 z-50 lg:z-10
            h-full lg:h-[calc(100vh-100px)] w-full sm:w-[380px] lg:w-[380px]
            bg-transparent transition-transform duration-300 ease-in-out
            ${isTrayOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
            p-4 lg:p-0
          `}>
            {/* Dark Overlay for Mobile when drawer open */}
            {isTrayOpen && (
              <div 
                onClick={() => setIsTrayOpen(false)} 
                className="fixed inset-0 bg-black/60 backdrop-blur-sm lg:hidden -z-10"
              />
            )}

            {/* REALISTIC DARK CHOCOLATE BROWN TRAY CONTAINER */}
            <div className="w-full h-full bg-[#180E0A] border-4 border-[#3A2216] rounded-3xl p-5 shadow-2xl flex flex-col justify-between relative overflow-hidden ring-1 ring-[#D4AF37]/30">
              
              {/* Patterned Tray Texture Background (Reference Image 2 style) */}
              <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:12px_12px]" />

              <div>
                {/* Tray Header */}
                <div className="flex items-center justify-between pb-3 border-b border-[#3A2216]">
                  <div className="flex items-center space-x-2">
                    <ShoppingBasket className="w-5 h-5 text-[#D4AF37]" />
                    <h3 className="font-extrabold text-base text-[#F3E5AB] tracking-wide">
                      ҚОҢЫР ПОДНОС
                    </h3>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-xs bg-[#2A1B15] text-[#D4AF37] px-2.5 py-0.5 rounded-full border border-[#3A2216] font-bold">
                      {totalItemCount} тағам
                    </span>
                    <button 
                      onClick={() => setIsTrayOpen(false)}
                      className="lg:hidden p-1 text-gray-400 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Selected Branch Info inside Tray */}
                <div className="mt-3 bg-[#231510] p-2.5 rounded-xl border border-[#3A2216] flex items-center justify-between text-xs">
                  <span className="text-gray-400 truncate max-w-[200px]">📍 {selectedBranch.name}</span>
                  <button onClick={() => setSelectedBranch(null)} className="text-[#D4AF37] text-[10px] font-bold hover:underline">
                    Өзгерт
                  </button>
                </div>

                {/* Tray Cart Items List */}
                <div className="mt-4 space-y-3 max-h-[calc(100vh-360px)] lg:max-h-[calc(100vh-420px)] overflow-y-auto pr-1 custom-scrollbar">
                  {cart.length === 0 ? (
                    <div className="py-12 text-center text-gray-400">
                      <ShoppingBag className="w-12 h-12 mx-auto text-gray-600 mb-2 opacity-40" />
                      <p className="text-sm font-medium">Поднос бос</p>
                      <p className="text-xs text-gray-400 mt-1">Мәзірден дәмді тағамдарды таңдаңыз</p>
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div
                        key={item.cartId}
                        className="bg-[#241611] p-3 rounded-xl border border-[#3A2216] flex flex-col justify-between space-y-2"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-2.5">
                            <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover shrink-0" />
                            <div>
                              <h4 className="text-xs font-bold text-[#F3E5AB] leading-snug">{item.name}</h4>
                              {item.isCombo ? (
                                <p className="text-[10px] text-gray-400">
                                  {item.garnishName} ({item.garnishPrice}₸) + {item.chickenName} ({item.chickenPrice}₸)
                                </p>
                              ) : (
                                <p className="text-[10px] text-gray-400">{item.weight}</p>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.cartId)}
                            className="text-gray-400 hover:text-rose-400 transition-colors p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between pt-1 border-t border-[#2F1B12]">
                          <div className="flex items-center space-x-2 bg-[#180E0A] rounded-lg px-2 py-0.5 border border-[#3A2216]">
                            <button
                              onClick={() => updateQuantity(item.cartId, -1)}
                              className="text-[#D4AF37] hover:text-white"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.cartId, 1)}
                              className="text-[#D4AF37] hover:text-white"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="text-xs font-black text-[#D4AF37]">
                            {item.price * item.quantity}₸
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Tray Footer & WhatsApp Checkout */}
              <div className="pt-4 border-t border-[#3A2216] mt-auto">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-gray-300 font-bold uppercase tracking-wider">ЖАЛПЫ СОММА:</span>
                  <span className="text-2xl font-black text-[#F3E5AB]">{cartTotal}₸</span>
                </div>

                <button
                  disabled={cart.length === 0}
                  onClick={() => setShowOrderModal(true)}
                  className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B] disabled:opacity-40 hover:from-[#F3E5AB] hover:to-[#D4AF37] text-[#1F1410] font-black py-3 px-4 rounded-xl text-xs uppercase tracking-wider shadow-lg transition-all flex items-center justify-center space-x-2"
                >
                  <span>ТАПСЫРЫС БЕРУ ❤️</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </aside>
        </main>
      )}

      {/* STEP 3: CUSTOMER DELIVERY INFORMATION MODAL */}
      {showOrderModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#2A1B15] border border-[#3D291F] rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setShowOrderModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-[#F3E5AB] mb-1">Тапсырысты рәсімдеу</h3>
            <p className="text-xs text-gray-400 mb-4">Жеткізу ақпаратын толтырыңыз</p>

            <form onSubmit={handleSendWhatsAppOrder} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Аты-жөні *</label>
                <input
                  type="text"
                  required
                  placeholder="Мұхаммед"
                  value={orderForm.name}
                  onChange={(e) => setOrderForm({ ...orderForm, name: e.target.value })}
                  className="w-full bg-[#1F1410] border border-[#3D291F] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Телефон нөмірі *</label>
                <input
                  type="tel"
                  required
                  placeholder="+7 (778) 580-23-08"
                  value={orderForm.phone}
                  onChange={(e) => setOrderForm({ ...orderForm, phone: e.target.value })}
                  className="w-full bg-[#1F1410] border border-[#3D291F] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Тапсырыс түрі</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setOrderForm({ ...orderForm, orderType: 'delivery' })}
                    className={`py-2 rounded-lg text-xs font-bold transition-all ${
                      orderForm.orderType === 'delivery'
                        ? 'bg-[#D4AF37] text-[#1F1410]'
                        : 'bg-[#1F1410] text-gray-400 border border-[#3D291F]'
                    }`}
                  >
                    Жеткізу
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderForm({ ...orderForm, orderType: 'pickup' })}
                    className={`py-2 rounded-lg text-xs font-bold transition-all ${
                      orderForm.orderType === 'pickup'
                        ? 'bg-[#D4AF37] text-[#1F1410]'
                        : 'bg-[#1F1410] text-gray-400 border border-[#3D291F]'
                    }`}
                  >
                    Өзі алып кету
                  </button>
                </div>
              </div>

              {orderForm.orderType === 'delivery' && (
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">Жеткізу мекенжайы *</label>
                  <input
                    type="text"
                    required
                    placeholder="Көше, үй, пәтер..."
                    value={orderForm.address}
                    onChange={(e) => setOrderForm({ ...orderForm, address: e.target.value })}
                    className="w-full bg-[#1F1410] border border-[#3D291F] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Қосымша түсініктеме</label>
                <textarea
                  rows="2"
                  placeholder="Домофон, подьезд, т.б."
                  value={orderForm.comment}
                  onChange={(e) => setOrderForm({ ...orderForm, comment: e.target.value })}
                  className="w-full bg-[#1F1410] border border-[#3D291F] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="pt-2 border-t border-[#3D291F]">
                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2 shadow-lg"
                >
                  <Phone className="w-4 h-4" />
                  <span>WHATSAPP АРҚЫЛЫ ЖІБЕРУ</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* STEP 4: SECURE ADMIN PANEL MODAL */}
      {showAdminModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#2A1B15] border border-[#3D291F] rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowAdminModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-[#F3E5AB] mb-1">Әкімші Панелі (Admin)</h3>

            {!isAdminLoggedIn ? (
              <form onSubmit={handleAdminAuth} className="space-y-4 mt-4 max-w-xs mx-auto text-center">
                <Lock className="w-10 h-10 mx-auto text-[#D4AF37]" />
                <p className="text-xs text-gray-300">Жүйеге кіру үшін құпия сөзді енгізіңіз</p>
                {adminError && <p className="text-xs text-rose-400">{adminError}</p>}
                <input
                  type="password"
                  placeholder="Құпия сөз (aport2026)"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full bg-[#1F1410] border border-[#3D291F] rounded-lg px-3 py-2 text-xs text-white text-center"
                />
                <button
                  type="submit"
                  className="w-full bg-[#D4AF37] text-[#1F1410] font-bold py-2 rounded-lg text-xs"
                >
                  Кіру
                </button>
              </form>
            ) : (
              <div className="space-y-6 mt-4">
                <div className="flex justify-between items-center bg-[#1F1410] p-3 rounded-lg border border-[#3D291F]">
                  <span className="text-xs text-emerald-400 font-bold">✓ Рұқсат берілді</span>
                  <button
                    onClick={() => setProducts(INITIAL_PRODUCTS)}
                    className="text-[11px] text-[#D4AF37] hover:underline"
                  >
                    Бастапқы мәзірді қалпына келтіру
                  </button>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-[#D4AF37] uppercase mb-2">Тағамдарды басқару & Бағаларды өзгерту</h4>
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                    {products.map((prod) => (
                      <div key={prod.id} className="flex items-center justify-between bg-[#1F1410] p-2.5 rounded-lg border border-[#3D291F]">
                        <div className="flex items-center space-x-2">
                          <img src={prod.image} alt={prod.name} className="w-8 h-8 rounded object-cover" />
                          <div>
                            <p className="text-xs font-bold text-[#F3E5AB]">{prod.name}</p>
                            <p className="text-[10px] text-gray-400">{prod.category}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <input
                            type="number"
                            value={prod.price}
                            onChange={(e) => {
                              const newPrice = Number(e.target.value);
                              setProducts(products.map(p => p.id === prod.id ? { ...p, price: newPrice } : p));
                            }}
                            className="w-20 bg-[#2A1B15] border border-[#3D291F] text-xs px-2 py-1 text-right text-[#D4AF37] rounded font-bold"
                          />
                          <span className="text-xs text-gray-400">₸</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-[#160E0B] border-t border-[#3D291F] py-6 px-4 text-center text-xs text-gray-400 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-bold text-[#F3E5AB]">APORT ASHANA — Атырау, Қазақстан</p>
            <p className="text-[11px] text-gray-400 mt-0.5">Барлық құқықтар қорғалған © 2026</p>
          </div>
          <div className="flex items-center space-x-4 text-gray-400 text-[11px]">
            <span>Жеткізу: +7 778 580 2308</span>
            <span>•</span>
            <span>Сағат: 08:00 - 24:00</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
```
