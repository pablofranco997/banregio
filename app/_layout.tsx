import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

interface Prestamo {
  cliente: string;
  id: number;
  fecha: string;
  monto: number;
  estado: string;
}

interface PrestamoCalculado extends Prestamo {
  plazo: number;
  interes: number;
  iva: number;
  pago: number;
  tasaInteres: number;
}

const DIAS_ANIO_COMERCIAL = 360;
const TASA_IVA = 0.16;
const FechaActual = '15-feb-21';
const Cliente = '00103228';

const prestamos: Prestamo[] = [
  {
    cliente: '00103228',
    id: 1,
    fecha: '2021-01-11',
    monto: 37500.0,
    estado: 'Pendiente',
  },
  {
    cliente: '00103228',
    id: 2,
    fecha: '2021-01-19',
    monto: 725.18,
    estado: 'Pendiente',
  },
  {
    cliente: '00103228',
    id: 3,
    fecha: '2021-01-31',
    monto: 1578.22,
    estado: 'Pendiente',
  },
  {
    cliente: '00103228',
    id: 4,
    fecha: '2021-02-04',
    monto: 380.0,
    estado: 'Pendiente',
  },
  {
    cliente: '70099925',
    id: 1,
    fecha: '2021-01-07',
    monto: 2175.25,
    estado: 'Pagado',
  },
  {
    cliente: '70099925',
    id: 2,
    fecha: '2021-01-13',
    monto: 499.99,
    estado: 'Pagado',
  },
  {
    cliente: '70099925',
    id: 3,
    fecha: '2021-01-24',
    monto: 5725.18,
    estado: 'Pendiente',
  },
  {
    cliente: '70099925',
    id: 4,
    fecha: '2021-02-07',
    monto: 876.13,
    estado: 'Pendiente',
  },
  {
    cliente: '00298185',
    id: 1,
    fecha: '2021-02-04',
    monto: 545.55,
    estado: 'Pendiente',
  },
  {
    cliente: '15000125',
    id: 1,
    fecha: '2020-12-31',
    monto: 15220.0,
    estado: 'Pagado',
  },
];

const fechaActual = '2021-02-15';
function getTasaInteres(plazo: number): string {
  const tasa = tasasInteres.find(
    (rate) => plazo >= rate.plazoMin && plazo <= rate.plazoMax
  );
  return tasa ? tasa.tasaInteres : '';
}

interface Rate {
  plazoMin: number;
  plazoMax: number;
  tasaInteres: string;
}

const tasasInteres: Rate[] = [
  { plazoMin: 1, plazoMax: 1, tasaInteres: '7.00%' },
  { plazoMin: 2, plazoMax: 7, tasaInteres: '6.50%' },
  { plazoMin: 8, plazoMax: 15, tasaInteres: '6.00%' },
  { plazoMin: 16, plazoMax: 30, tasaInteres: '5.50%' },
  { plazoMin: 31, plazoMax: 360, tasaInteres: '5.00%' },
];

function calcularPlazo(fechaActual: Date, fechaPrestamo: Date): number {
  const diffTime = Math.abs(fechaActual.getTime() - fechaPrestamo.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

function calcularInteres(
  monto: number,
  plazo: number,
  tasaInteres: number
): number {
  const interes = (monto * plazo * tasaInteres) / DIAS_ANIO_COMERCIAL;
  return parseFloat(interes.toFixed(2));
}

function calcularIVA(interes: number): number {
  const iva = interes * TASA_IVA;
  return parseFloat(iva.toFixed(2));
}

function calcularPago(monto: number, interes: number, iva: number): number {
  const pago = monto + interes + iva;
  return parseFloat(pago.toFixed(2));
}

const _layout = () => {
  const [prestamosCalculados, setPrestamosCalculados] = useState<
    PrestamoCalculado[]
  >([]);

  useEffect(() => {
    const calculados = prestamos.map((prestamo) => {
      const plazo = calcularPlazo(
        new Date(fechaActual),
        new Date(prestamo.fecha)
      );
      const tasaInteres = parseFloat(getTasaInteres(plazo));
      const interes = calcularInteres(prestamo.monto, plazo, tasaInteres);
      const iva = calcularIVA(interes);
      const pago = calcularPago(prestamo.monto, interes, iva);

      return { ...prestamo, plazo, interes, iva, pago, tasaInteres };
    });
    setPrestamosCalculados(calculados);
  }, []);

  const [prestamosPorCliente, setPrestamosPorCliente] = useState<
    Record<string, PrestamoCalculado[]>
  >({});

  useEffect(() => {
    const prestamosPorCliente: Record<string, PrestamoCalculado[]> = {};
    prestamosCalculados.forEach((prestamo) => {
      if (!prestamosPorCliente[prestamo.cliente]) {
        prestamosPorCliente[prestamo.cliente] = [];
      }
      prestamosPorCliente[prestamo.cliente].push(prestamo);
    });
    setPrestamosPorCliente(prestamosPorCliente);
  }, [prestamosCalculados]);

  const [inputValues, setInputValues] = useState({
    fechaActual: '',
    cliente: '',
    tasaIVA: '',
    diasAnioComercial: '',
  });

  const [searchValues, setSearchValues] = useState({
    fechaActual: '',
    cliente: '',
    tasaIVA: '',
    diasAnioComercial: '',
  });

  // Logic to save the input values
  const handleSaveValues = () => {
    setSearchValues({
      fechaActual: inputValues.fechaActual,
      cliente: inputValues.cliente,
      tasaIVA: inputValues.tasaIVA,
      diasAnioComercial: inputValues.diasAnioComercial,
    });
  };

  useEffect(() => {
    setInputValues({
      fechaActual: FechaActual,
      cliente: Cliente,
      tasaIVA: TASA_IVA.toString(),
      diasAnioComercial: DIAS_ANIO_COMERCIAL.toString(),
    });
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ padding: 16 }}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              gap: 16,
              alignItems: 'center',
            }}
          >
            <Text>Fecha Actual: </Text>

            <TextInput
              value={inputValues.fechaActual}
              keyboardType='numeric'
              editable={false}
              style={{
                height: 40,
                borderColor: 'gray',
                borderWidth: 1,
                paddingHorizontal: 10,
                borderRadius: 5,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              gap: 16,
              alignItems: 'center',
            }}
          >
            <Text>Cliente: </Text>
            <TextInput
              value={inputValues.cliente}
              editable={false}
              style={{
                height: 40,
                borderColor: 'gray',
                borderWidth: 1,
                paddingHorizontal: 10,
                borderRadius: 5,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              gap: 16,
              alignItems: 'center',
            }}
          >
            <Text>Tasa IVA </Text>
            <TextInput
              value={inputValues.tasaIVA}
              editable={false}
              style={{
                height: 40,
                borderColor: 'gray',
                borderWidth: 1,
                paddingHorizontal: 10,
                borderRadius: 5,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              gap: 16,
              alignItems: 'center',
            }}
          >
            <Text>Días del año comercial: </Text>
            <TextInput
              value={inputValues.diasAnioComercial}
              editable={false}
              style={{
                height: 40,
                borderColor: 'gray',
                borderWidth: 1,
                paddingHorizontal: 10,
                borderRadius: 5,
              }}
            />
          </View>
          <Button title='Buscar' onPress={handleSaveValues} />

          <View style={{ gap: 32 }}>
            {Object.entries(prestamosPorCliente).map(([cliente, prestamos]) => {
              if (cliente === searchValues.cliente) {
                return (
                  <View key={cliente} style={{ gap: 16 }}>
                    <Text style={{ fontWeight: 'bold' }}>
                      Cliente: {cliente}
                    </Text>
                    <>
                      <ScrollView style={{ height: 250 }}>
                        <View style={{ padding: 16, gap: 16 }}>
                          {prestamos
                            .sort(
                              (a, b) =>
                                new Date(a.fecha).getTime() -
                                new Date(b.fecha).getTime()
                            )
                            .map((prestamo) => (
                              <>
                                {prestamo.estado != 'pendiente' ? (
                                  <View key={prestamo.estado}>
                                    <Text>Plazo: {prestamo.plazo} días</Text>
                                    <Text>
                                      Fecha de inicio: {prestamo.fecha}
                                    </Text>
                                    <Text>
                                      Monto: ${prestamo.monto.toFixed(2)}
                                    </Text>
                                    <Text>
                                      Interés: ${prestamo.interes.toFixed(2)}
                                    </Text>
                                    <Text>IVA: ${prestamo.iva.toFixed(2)}</Text>
                                    <Text>
                                      Pago: ${prestamo.pago.toFixed(2)}
                                    </Text>
                                    <Text>Estado: {prestamo.estado}</Text>
                                    {/* <Text>ID: {prestamo.id}</Text> */}
                                    <Text>Tasa: {prestamo.tasaInteres}</Text>
                                  </View>
                                ) : null}
                              </>
                            ))}
                        </View>
                      </ScrollView>
                    </>
                  </View>
                );
              } else {
                return null;
              }
            })}
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default _layout;

const styles = StyleSheet.create({});
