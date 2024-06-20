// import { blurImage } from '@/utils/blurImage';
// import Image from 'next/image';
// import Link from 'next/link';

// interface Props {
//     url: string;
//     link: string;
// }

// export default function PrincipalDesktop({ url, link }: Props) {

//     const hasUrl = url && url.length > 0;

//     return (
//         <div>
//             {/* PUBLICIDAD DESKTOP  */}
//             <div className="p-3 h-[170px] bg-publicidad col-span-12 hidden md:flex justify-center items-center relative">
//                 {
//                     hasUrl ? (
//                         <Link href={`${link || '#'} `} target='_blank' rel='noreferrer'>
//                             <Image
//                                 src={url}
//                                 alt={`publicidad`}
//                                 width={970}
//                                 height={150}
//                                 placeholder="blur"
//                                 blurDataURL={blurImage}
//                                 priority
//                                 aria-label="Publicidad principal"
//                                 className='object-cover'
//                             />
//                         </Link>
//                     ) : (
//                         <span className="text-sm text-muted-foreground flex items-center justify-center text-center">
//                             Espacio publicitario disponible
//                         </span>
//                     )
//                 }
//             </div>
//             {/* PUBLICIDAD MOBILE  */}
//             <div className="h-[120px] bg-publicidad col-span-12 flex md:hidden justify-center items-center relative p-3">
//                 {hasUrl ? (
//                     <Link href={`${link || '#'} `} target='_blank' rel='noreferrer' >
//                         <Image
//                             src={url}
//                             alt={`publicidad`}
//                             fill
//                             className="object-contain"
//                             placeholder="blur"
//                             blurDataURL={blurImage}
//                             priority
//                             aria-label="Publicidad principal"
//                         />
//                     </Link>
//                 ) : (
//                     <span className="text-sm text-muted-foreground flex items-center justify-center text-center">
//                         Espacio publicitario disponible
//                     </span>
//                 )
//                 }
//             </div>
//         </div>
//     )
// }
