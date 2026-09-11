/** Номер счётчика Яндекс Метрики. */
export const METRIKA_ID = 112490864;

/**
 * Счётчик подключается только на опубликованном сайте: при локальной
 * разработке он не нужен, иначе наши собственные заходы попадут в статистику.
 */
export const metrikaEnabled = process.env.NODE_ENV === "production";

/** Код счётчика, вставляется в разметку как можно раньше. */
export const metrikaSnippet = `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
m[i].l=1*new Date();
for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');
ym(${METRIKA_ID}, 'init', {webvisor:true, clickmap:true, trackLinks:true, accurateTrackBounce:true});`;
