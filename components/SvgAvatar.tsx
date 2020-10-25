import * as React from 'react'

const polys = [
  <path key="poly-1" fill="#330e14" d="M430 842L390 18l420 1068-844-28z" />,
  <path key="poly-2" fill="#fff" d="M1050 18L750 146 594 890l492 136z" />,
  <path key="poly-3" fill="#8d3a26" d="M650 210l-196-92-224 144 468 408z" />,
  <path key="poly-4" fill="#fff" d="M398 926l-28-172L22-62-62 938z" />,
  <path key="poly-5" fill="#00000c" d="M946 1006L718 906l-124 176 476 4z" />,
  <path key="poly-6" fill="#fff" d="M298 162L926 38-6 18l8 1068z" />,
  <path key="poly-7" fill="#000014" d="M306 894l20 52 280 64-628 56z" />,
  <path key="poly-8" fill="#fff" d="M570 962l172-40 344 136L946 26z" />,
  <path key="poly-9" fill="#a34f47" d="M298 198l-72 104 8 252 84 88z" />,
  <path key="poly-11" fill="#9e635b" d="M386 482l76-384 236 616-284-4z" />,
  <path key="poly-12" fill="#002c4a" d="M898 982l-176-72-120 176h484z" />,
  <path key="poly-13" fill="#654445" d="M426 1086l-40-296 168 16 24 280z" />,
  <path key="poly-14" fill="#43403c" d="M234 362l44-140 152-36-64 80z" />,
  <path key="poly-15" fill="#2b252f" d="M378 478l136 20 44-68-72-40z" />,
  <path key="poly-16" fill="#fff3d3" d="M914 54l-448 68-528 200L406-62z" />,
  <path key="poly-17" fill="#e49754" d="M562-62l524 44-260 128 16-92z" />,
  <path key="poly-18" fill="#fff2e9" d="M394 442L282 874l96-568 64 104z" />,
  <path key="poly-19" fill="#fff" d="M650 858l108-512 328 688-432-144z" />,
  <path key="poly-20" fill="#caa88d" d="M186 254L66 290l-112-12-16-96z" />,
  <path key="poly-21" fill="#fff" d="M202 286L430 86 126 38l-188 68z" />,
  <path key="poly-22" fill="#002134" d="M450 1054L298 918l-144 40-64 60z" />,
  <path key="poly-23" fill="#efe7de" d="M326 666l20-180 144 384-28-20z" />,
  <path key="poly-24" fill="#bb7253" d="M558 118l120 168-256 140-80-280z" />,
  <path key="poly-25" fill="#dad4c8" d="M642 370l284 24 160-16-452-92z" />,
  <path key="poly-26" fill="#ab9da4" d="M694 466l-48-36-88 548 148-324z" />,
  <path key="poly-27" fill="#fff" d="M-62 314l72 772 244-244-36-556z" />,
  <path key="poly-28" fill="#26303f" d="M654 374l-68 52 48 48 24-60z" />,
  <path key="poly-29" fill="#ff5b57" d="M266 602l68 4-40-120-76-32z" />,
  <path key="poly-30" fill="#fed7ad" d="M606-62L-54-26l840 160L918 6z" />,
  <path key="poly-31" fill="#af9a9f" d="M722 906l-144-56v104l84 40z" />,
  <path key="poly-32" fill="#fefef6" d="M366 338l-44 284-368 60 416 244z" />,
  <path key="poly-33" fill="#fff" d="M722 654l296 432 68-628-408-104z" />,
  <path key="poly-34" fill="#c19368" d="M966 126l60-20 60 44-140 16z" />,
  <path key="poly-35" fill="#fffff7" d="M574 78l100 176-4 128 416-172z" />,
  <path key="poly-36" fill="#374a54" d="M494 798l-32-36 64 140 116-148z" />,
  <path key="poly-37" fill="#725151" d="M514 534L398 646l76 112 160-160z" />,
  <path key="poly-38" fill="#c5817b" d="M658 574L378 474l44 140 152-212z" />,
  <path key="poly-39" fill="#a9756e" d="M370 750l144 112-200 76 104 72z" />,
  <path key="poly-40" fill="#dca872" d="M342 30v8L-62-2l376-60z" />,
  <path key="poly-41" fill="#fff" d="M-6 718l-52-460 308 120v64z" />,
  <path key="poly-42" fill="#203245" d="M690 1086l4-188 148 88 232 88z" />,
  <path key="poly-43" fill="#fff" d="M702 890l-36 92-24-236 444 324z" />,
  <path key="poly-44" fill="#d8dfd4" d="M106 1006l16-228-40-280-4 496z" />,
  <path key="poly-45" fill="#5b5143" d="M522 162l76 60 44 40 12-44z" />,
  <path key="poly-46" fill="#f1ddd3" d="M366 638l-76-152 12-32 128 116z" />,
  <path key="poly-47" fill="#fff7e8" d="M762 50L358-62l328 240L298 62z" />,
  <path key="poly-48" fill="#a37559" d="M934-62l152 28L910 74l20-20z" />,
  <path key="poly-49" fill="#9d9584" d="M226 278L522 98 262 222l68 296z" />,
  <path key="poly-50" fill="#524240" d="M242 326l52-88 140-76-36 52z" />,
  <path key="poly-51" fill="#bdada1" d="M446 762l56 24-120-172 56 252z" />,
  <path key="poly-52" fill="#fff" d="M-62 130l296 120 36-40L470 90z" />,
  <path key="poly-53" fill="#b26756" d="M570 158l-256 96 16 100 208 36z" />,
  <path key="poly-54" fill="#634446" d="M530 1042l-80-4-104-72 224-152z" />,
  <path key="poly-55" fill="#d6d2cc" d="M1066 110l20 224-484 20 452 52z" />,
  <path key="poly-56" fill="#fdffff" d="M990 46l96-12-424 312 56-156z" />,
  <path key="poly-57" fill="#35576c" d="M174 962L6 1042l80 12 196-144z" />,
  <path key="poly-58" fill="#fffcfb" d="M390 626l-160-4 16-116 112 436z" />,
  <path key="poly-59" fill="#cc8977" d="M578 438l-64-72 80-152 80 84z" />,
  <path key="poly-60" fill="#b4ab9f" d="M350 510v-32L226 306v100z" />,
  <path key="poly-61" fill="#fff" d="M930 398h96l60 688-468-268z" />,
  <path key="poly-62" fill="#091521" d="M274 1042l464-28-220 72-240-168z" />,
  <path key="poly-63" fill="#c19266" d="M518 158l-28-44-56 12-136 64z" />,
  <path key="poly-64" fill="#f6e4ca" d="M114 218l-64 72 192 40-32-100z" />,
  <path key="poly-65" fill="#423338" d="M378 506l80-44 92 8-44-92z" />,
  <path key="poly-66" fill="#96726f" d="M578 1086h-52l172-124-156-56z" />,
  <path key="poly-67" fill="#d89a89" d="M358 334l-4-52 104 120-140-24z" />,
  <path key="poly-68" fill="#f66460" d="M242 434l-16 76 44 88 28-76z" />,
  <path key="poly-69" fill="#865953" d="M574 450l-16-60-128 308 20 44z" />,
  <path key="poly-70" fill="#fff" d="M226 926l-112 56 140-436L18 290z" />,
  <path key="poly-71" fill="#b7aab0" d="M698 702L558 910l108 60-48-212z" />,
  <path key="poly-72" fill="#c09b9b" d="M690 454l-72 44 16 232 76-112z" />,
  <path key="poly-73" fill="#60434f" d="M482 790l-4-152 192-16-204 56z" />,
  <path key="poly-74" fill="#fff" d="M686 446l-12-92 332 256-248 28z" />,
  <path key="poly-75" fill="#7d6f73" d="M602 490l-12 356-148-140 196 88z" />,
  <path key="poly-76" fill="#c3ab9b" d="M-34 226l-8 72 108-24-8-60z" />,
  <path key="poly-77" fill="#d5887f" d="M306 630l-32-32 32-100 20 68z" />,
  <path key="poly-78" fill="#2a313c" d="M558 810l-68-20 8 44 52 40z" />,
  <path key="poly-79" fill="#fbf5e6" d="M218 530l-28 372 212-36-52 68z" />,
  <path key="poly-80" fill="#a35b53" d="M550 482l-172-24 12 36 104 68z" />,
  <path key="poly-81" fill="#e3c9c4" d="M370 738l-4 208 52-204 32 72z" />,
  <path key="poly-82" fill="#172231" d="M614 1086l12-68 64-44 340 76z" />,
  <path key="poly-83" fill="#5d4b4f" d="M602 382l-12 64 44 32 8-108z" />,
  <path key="poly-84" fill="#405e73" d="M694 890l4 60 172 24-192-72z" />,
  <path key="poly-85" fill="#faf0eb" d="M326 386l40 12 28 260-24-92z" />,
  <path key="poly-86" fill="#ebdbca" d="M734 174L650 54 134 30l676 92z" />,
  <path key="poly-87" fill="#fcf3e0" d="M22 138l372-76-268-24-4-100z" />,
  <path key="poly-88" fill="#523633" d="M282 214l84 32 28-76v44z" />,
  <path key="poly-89" fill="#8c5e4d" d="M678 238l-112-68-312 164 192-168z" />,
  <path key="poly-90" fill="#bc7e7c" d="M674 502l12-72-116 44-32 96z" />,
  <path key="poly-91" fill="#c54c4d" d="M290 498l12 124 24-20-60-112z" />,
  <path key="poly-92" fill="#fffcf3" d="M510 114l192 72L526 70l-268 84z" />,
  <path key="poly-93" fill="#303f4d" d="M334 926l-344 160 188-132 116-48z" />,
  <path key="poly-94" fill="#c5c3cb" d="M662 942l-12-132-88-8 40 20z" />,
  <path key="poly-95" fill="#878883" d="M466 866l-20-108 88 24-48-68z" />,
  <path key="poly-96" fill="#fbc696" d="M638-62L890 78l44-140L730 46z" />,
  <path key="poly-97" fill="#e8dbd2" d="M318 530l-48-76 84 72 92 300z" />,
  <path key="poly-98" fill="#8f7b70" d="M218 326l36-88 136 44-92-72z" />,
  <path key="poly-99" fill="#decbca" d="M610 534l28-32 8 72 164 144z" />,
  <path
    key="poly-10"
    fill="#fff"
    d="M1062 226l-72 860-356-888L374-62zM326 874l136-156-508-336-16 704z"
  />,
]

export function SvgAvatar({numPolys, className}: {numPolys: number; className?: string}) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" className={className}>
      <path fill="#d5c7c1" d="M0 0h1024v1024H0z" />
      <g fillOpacity=".5">{polys.slice(0, numPolys)}</g>
    </svg>
  )
}
