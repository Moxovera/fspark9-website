"use client";

import { useLayoutEffect } from "react";

/**
 * <head>'deki bloklayıcı script <html>'e `js` sınıfını ilk yüklemede ekler.
 * Dil değişince kök layout yeniden kurulur, React <html>'in niteliklerini
 * sıfırlar ve sınıf düşer; script istemci geçişinde bir daha çalışmaz. Sınıf
 * olmadan `.video-only` gizlenir (tanıtım filmi düğmesi ve halkası) ve reveal
 * hareketleri kapanır. Bu bileşen her kurulumda sınıfı boyamadan önce geri
 * koyar.
 */
export default function JsClass() {
  useLayoutEffect(() => {
    document.documentElement.classList.add("js");
  }, []);
  return null;
}
