/**
 * WebSerial helper — wraps navigator.serial for port selection and
 * provides the Transport instance that esptool-js consumes.
 */

import { Transport } from "esptool-js";

/** Check whether the current browser supports WebSerial. */
export function isWebSerialSupported(): boolean {
  return "serial" in navigator;
}

/**
 * Prompt the user to select a serial port via the browser picker.
 *
 * @param filters  Optional USB vendor/product ID filters.
 *                 TODO: Fill in your Vexaminer USB VID/PID to narrow the picker.
 * @returns The selected SerialPort, or null if the user cancelled.
 */
export async function requestPort(
  filters?: SerialPortFilter[],
): Promise<SerialPort | null> {
  try {
    const port = await navigator.serial.requestPort({
      filters: filters ?? [
        // TODO: Add your Vexaminer USB VID/PID filters here, e.g.:
        // { usbVendorId: 0x1a86, usbProductId: 0x7523 },  // CH340
        // { usbVendorId: 0x10c4, usbProductId: 0xea60 },  // CP2102
        // { usbVendorId: 0x303a },                         // Espressif native USB
      ],
    });
    return port;
  } catch {
    // User cancelled the picker or no ports available
    return null;
  }
}

/**
 * Create an esptool-js Transport from a SerialPort.
 */
export function createTransport(port: SerialPort): Transport {
  return new Transport(port, true);
}

/**
 * Disconnect and release the serial port.
 */
export async function disconnectTransport(
  transport: Transport,
): Promise<void> {
  try {
    await transport.disconnect();
  } catch {
    // Ignore errors during cleanup
  }
}
