interface Loan {
  cliente: string;
  id: number;
  fecha: Date;
  monto: number;
  estado: string;
}
interface Rate {
  plazoMin: number;
  plazoMax: number;
  tasaInteres: string;
}

export const prestamos: Loan[] = [
  {
    cliente: '00103228',
    id: 1,
    fecha: new Date('10-ene-21'),
    monto: 37500.0,
    estado: 'Pendiente',
  },
  {
    cliente: '00103228',
    id: 2,
    fecha: new Date('19-ene-21'),
    monto: 725.18,
    estado: 'Pendiente',
  },
  {
    cliente: '00103228',
    id: 3,
    fecha: new Date('31-ene-21'),
    monto: 1578.22,
    estado: 'Pendiente',
  },
  {
    cliente: '00103228',
    id: 4,
    fecha: new Date('04-feb-21'),
    monto: 380.0,
    estado: 'Pendiente',
  },
  {
    cliente: '70099925',
    id: 1,
    fecha: new Date('07-ene-21'),
    monto: 2175.25,
    estado: 'Pagado',
  },
  {
    cliente: '70099925',
    id: 2,
    fecha: new Date('13-ene-21'),
    monto: 499.99,
    estado: 'Pagado',
  },
  {
    cliente: '70099925',
    id: 3,
    fecha: new Date('24-ene-21'),
    monto: 5725.18,
    estado: 'Pendiente',
  },
  {
    cliente: '70099925',
    id: 4,
    fecha: new Date('07-feb-21'),
    monto: 876.13,
    estado: 'Pendiente',
  },
  {
    cliente: '00298185',
    id: 1,
    fecha: new Date('04-feb-21'),
    monto: 545.55,
    estado: 'Pendiente',
  },
  {
    cliente: '15000125',
    id: 1,
    fecha: new Date('31-dic-20'),
    monto: 15220.0,
    estado: 'Pagado',
  },
];

export const tasas: Rate[] = [
  { plazoMin: 1, plazoMax: 1, tasaInteres: '7.00%' },
  { plazoMin: 2, plazoMax: 7, tasaInteres: '6.50%' },
  { plazoMin: 8, plazoMax: 15, tasaInteres: '6.00%' },
  { plazoMin: 16, plazoMax: 30, tasaInteres: '5.50%' },
  { plazoMin: 31, plazoMax: 360, tasaInteres: '5.00%' },
];
