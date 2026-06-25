import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

const HERO_IMG =
  'https://cdn.poehali.dev/projects/0ab54c6b-e658-4185-9928-be1ffbdbd821/files/cb395244-f9b4-4bde-82b8-58f6af809678.jpg';

const services = [
  {
    icon: 'Activity',
    title: 'Диагностика неисправностей',
    text: 'Полная проверка УЗИ-аппаратов, МРТ, КТ, рентген-систем и лабораторного оборудования.',
  },
  {
    icon: 'Wrench',
    title: 'Ремонт и замена узлов',
    text: 'Восстановление работоспособности с использованием оригинальных и сертифицированных деталей.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Профилактика и ТО',
    text: 'Плановое обслуживание для продления срока службы и соответствия нормам безопасности.',
  },
  {
    icon: 'Truck',
    title: 'Выезд инженера',
    text: 'Сервисный специалист приезжает на объект в течение 24 часов после оформления заявки.',
  },
  {
    icon: 'FileCheck2',
    title: 'Калибровка и поверка',
    text: 'Метрологическая поверка измерительных приборов с выдачей официальных документов.',
  },
  {
    icon: 'Headphones',
    title: 'Сервисная поддержка',
    text: 'Сопровождение оборудования и консультации инженеров на всём сроке эксплуатации.',
  },
];

const serviceDetails = [
  { icon: 'ScanSearch', title: 'Диагностика', text: 'Точное выявление неисправностей с использованием сертифицированного оборудования.' },
  { icon: 'Wrench', title: 'Текущий и капитальный ремонт', text: 'Ремонт любой сложности на месте у заказчика или в нашем сервисном центре.' },
  { icon: 'CalendarCheck', title: 'Профилактическое обслуживание (ТО)', text: 'Регулярные работы для предотвращения поломок и продления срока службы аппаратов.' },
  { icon: 'Gauge', title: 'Калибровка и настройка', text: 'Обеспечение точности показаний и корректной работы программного обеспечения.' },
  { icon: 'Package', title: 'Поставка запчастей и комплектующих', text: 'Собственный склад с оригинальными и качественными аналогами деталей.' },
  { icon: 'Cpu', title: 'Модернизация оборудования', text: 'Обновление ПО и аппаратной части для соответствия современным стандартам.' },
];

const equipmentTypes = [
  { icon: 'Waves', label: 'УЗИ' },
  { icon: 'PawPrint', label: 'Ветеринарное оборудование' },
  { icon: 'Eye', label: 'Эндоскопическое оборудование' },
  { icon: 'BrainCircuit', label: 'КТ и МРТ' },
  { icon: 'Radiation', label: 'Рентгены и маммографы' },
  { icon: 'Sparkles', label: 'Косметологическое оборудование' },
  { icon: 'EyeIcon', label: 'Офтальмологическое оборудование' },
  { icon: 'Ear', label: 'ЛОР-комбайны' },
  { icon: 'Stethoscope', label: 'Любое диагностическое оборудование' },
];

const steps = [
  { num: '01', title: 'Оформление заявки', text: 'Заполните форму — укажите оборудование и характер неисправности.' },
  { num: '02', title: 'Диагностика', text: 'Инженер оценивает состояние и формирует смету работ.' },
  { num: '03', title: 'Ремонт', text: 'Выполняем работы и держим вас в курсе на каждом этапе.' },
  { num: '04', title: 'Сдача и гарантия', text: 'Возвращаем оборудование в работу с гарантийными обязательствами.' },
];

const SEND_EMAIL_URL = 'https://functions.poehali.dev/d7bc6f9d-edd5-402d-81ba-0fc59fafefa4';

const Index = () => {
  const [form, setForm] = useState({ name: '', phone: '', device: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch(SEND_EMAIL_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', phone: '', device: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <a href="#home" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Icon name="HeartPulse" size={20} />
            </div>
            <span className="font-display text-xl font-700 tracking-tight text-primary">
              МЕДТЕХ<span className="text-accent">РЕМОНТ</span>
            </span>
          </a>
          <nav className="hidden items-center gap-8 md:flex">
            <a href="#home" className="text-sm font-500 text-muted-foreground transition-colors hover:text-primary">Главная</a>
            <a href="#services" className="text-sm font-500 text-muted-foreground transition-colors hover:text-primary">Услуги</a>
            <a href="#contacts" className="text-sm font-500 text-muted-foreground transition-colors hover:text-primary">Контакты</a>
          </nav>
          <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
            <a href="#contacts">Оставить заявку</a>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Медицинское оборудование" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/50" />
        </div>
        <div className="container relative py-24 md:py-36">
          <div className="max-w-2xl animate-fade-in">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-500 text-white">
              <Icon name="BadgeCheck" size={16} />
              Сертифицированный сервисный центр
            </div>
            <h1 className="font-display text-4xl font-700 leading-tight text-white md:text-6xl">
              Ремонт и обслуживание медицинского диагностического оборудования
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/80">
              Возвращаем технику в строй быстро и надёжно. Приём и отслеживание заявок,
              выезд инженера, гарантия на все работы.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <a href="#contacts">
                  <Icon name="ClipboardList" size={18} className="mr-2" />
                  Подать заявку на ремонт
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white">
                <a href="#services">Наши услуги</a>
              </Button>
            </div>
            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-white/15 pt-8">
              {[
                { v: '12+', l: 'лет на рынке' },
                { v: '24ч', l: 'выезд инженера' },
                { v: '500+', l: 'единиц техники' },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display text-3xl font-700 text-white">{s.v}</div>
                  <div className="mt-1 text-sm text-white/70">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 md:py-28">
        <div className="container">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="font-500 text-sm uppercase tracking-widest text-accent">Услуги</span>
            <h2 className="mt-3 font-display text-3xl font-700 text-primary md:text-4xl">
              Полный цикл сервисного обслуживания
            </h2>
            <p className="mt-4 text-muted-foreground">
              Работаем с оборудованием ведущих производителей. Соблюдаем регламенты и стандарты безопасности.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div
                key={s.title}
                className="group rounded-lg border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-md bg-secondary text-primary transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <Icon name={s.icon} size={24} />
                </div>
                <h3 className="font-display text-xl font-600 text-primary">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="bg-secondary/30 py-20 md:py-28">
        <div className="container">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="font-500 text-sm uppercase tracking-widest text-accent">Что мы делаем</span>
            <h2 className="mt-3 font-display text-3xl font-700 text-primary md:text-4xl">Наши услуги</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {serviceDetails.map((s) => (
              <div key={s.title} className="flex gap-4 rounded-xl border border-border bg-card p-6 transition-all hover:border-accent/40 hover:shadow-md">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Icon name={s.icon} size={22} />
                </div>
                <div>
                  <h3 className="font-display text-base font-600 text-primary">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment Types */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="font-500 text-sm uppercase tracking-widest text-accent">Специализация</span>
            <h2 className="mt-3 font-display text-3xl font-700 text-primary md:text-4xl">Работаем со следующими видами техники</h2>
          </div>
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {equipmentTypes.map((e) => (
              <div key={e.label} className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-5 text-center transition-all hover:border-accent/40 hover:shadow-md hover:-translate-y-1">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <Icon name={e.icon} size={24} fallback="Stethoscope" />
                </div>
                <span className="text-sm font-500 text-primary leading-tight">{e.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-primary py-20 md:py-28">
        <div className="container">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="font-500 text-sm uppercase tracking-widest text-accent">Как мы работаем</span>
            <h2 className="mt-3 font-display text-3xl font-700 text-white md:text-4xl">
              Прозрачный процесс от заявки до сдачи
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-4">
            {steps.map((s) => (
              <div key={s.num} className="relative">
                <div className="font-display text-5xl font-700 text-accent/40">{s.num}</div>
                <h3 className="mt-3 font-display text-lg font-600 text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contacts + Form */}
      <section id="contacts" className="py-20 md:py-28">
        <div className="container grid gap-12 lg:grid-cols-2">
          <div>
            <span className="font-500 text-sm uppercase tracking-widest text-accent">Контакты</span>
            <h2 className="mt-3 font-display text-3xl font-700 text-primary md:text-4xl">
              Оставьте заявку на ремонт
            </h2>
            <p className="mt-4 max-w-md text-muted-foreground">
              Заполните форму, и инженер свяжется с вами для уточнения деталей. Вы будете получать
              уведомления о статусе заявки.
            </p>
            <div className="mt-10 space-y-6">
              {[
                { icon: 'Phone', label: 'Телефон', value: '+7 (903) 0-072-072' },
                { icon: 'Mail', label: 'Email', value: 'medtehremont@yandex.ru' },
                { icon: 'MapPin', label: 'Адрес', value: 'Московская обл., Красногорский г.о., пгт Путилково, территория Гринвуд, стр. 25' },
                { icon: 'Clock', label: 'Режим работы', value: 'Ежедневно, 09:00–20:00' },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-md bg-secondary text-primary">
                    <Icon name={c.icon} size={20} />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">{c.label}</div>
                    <div className="font-500 text-primary">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-card p-8 shadow-sm">
            <h3 className="font-display text-xl font-600 text-primary">Форма заявки</h3>
            <div className="mt-6 space-y-5">
              <div>
                <Label htmlFor="name">Ваше имя</Label>
                <Input
                  id="name"
                  className="mt-2"
                  placeholder="Иван Петров"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="phone">Телефон</Label>
                <Input
                  id="phone"
                  className="mt-2"
                  placeholder="+7 (___) ___-__-__"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="device">Оборудование</Label>
                <Input
                  id="device"
                  className="mt-2"
                  placeholder="Напр.: УЗИ-аппарат, модель..."
                  value={form.device}
                  onChange={(e) => setForm({ ...form, device: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="message">Описание неисправности</Label>
                <Textarea
                  id="message"
                  className="mt-2 min-h-28"
                  placeholder="Опишите проблему..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </div>
              <Button
                type="submit"
                size="lg"
                disabled={status === 'loading'}
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 disabled:opacity-70"
              >
                <Icon name={status === 'loading' ? 'Loader' : 'Send'} size={18} className={`mr-2 ${status === 'loading' ? 'animate-spin' : ''}`} />
                {status === 'loading' ? 'Отправляем...' : 'Отправить заявку'}
              </Button>
              {status === 'success' && (
                <div className="flex items-center gap-2 rounded-md bg-green-50 px-4 py-3 text-sm text-green-700">
                  <Icon name="CircleCheck" size={16} />
                  Заявка отправлена! Мы свяжемся с вами в ближайшее время.
                </div>
              )}
              {status === 'error' && (
                <div className="flex items-center gap-2 rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">
                  <Icon name="CircleAlert" size={16} />
                  Ошибка отправки. Позвоните нам: +7 (903) 0-072-072
                </div>
              )}
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-primary py-10">
        <div className="container flex flex-col items-center justify-between gap-4 text-sm text-white/70 md:flex-row">
          <div className="flex items-center gap-2">
            <Icon name="HeartPulse" size={18} className="text-accent" />
            <span className="font-display font-600 text-white">МЕДТЕХРЕМОНТ</span>
          </div>
          <span>© 2026 МедТехРемонт. Ремонт медицинского оборудования.</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;