import Fingerprint from 'fingerprintjs2';

export default class FingerprintUtils {
  private fpHash!: string;
  constructor() {
    Fingerprint.get({
      excludes: {
        userAgent: true,
        language: true,
        pixelRatio: true,
        hardwareConcurrency: true,
        webglVendorAndRenderer: true,
        webdriver: true,
        deviceMemory: true,
        openDatabase: true,
        fonts: true,
        fontsFlash: true,
        audio: true,
        doNotTrack: true,
        enumerateDevices: true,
        plugins: true,
        canvas: true,
        webgl: true,
        timezone: true,
      },
    }, (components: any) => {
      const values = components.map((component: any) => component.value)
      const murmur = Fingerprint.x64hash128(values.join(''), 31)
      this.fpHash = murmur;
    })
  }

  public get getFP() {
    return this.fpHash;
  }
}