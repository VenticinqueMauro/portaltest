// import React from 'react'

// export default function Container() {
//     return (
//         <div className="py-10">
//             <div className="relative">
//                 <SectionTitle title={sectionTitle} />
//                 {
//                     allNews.length &&
//                     <div className="max-w-6xl 2xl:mx-auto grid grid-cols-12 gap-4 px-3 lg:mr-[240px]">
//                         <NoticiaPrincipalCategory
//                             image={{ type: news.mainNews.media.type as 'image' | 'video', url: news.mainNews.media.url }}
//                             pretitle={news.mainNews.pretitle}
//                             title={news.mainNews.title}
//                             category={news.mainNews.category}
//                             path={news.mainNews.path!}
//                             id={news.mainNews.id}
//                         />

//                         <div className="col-span-12 lg:col-span-4 min-h-full">
//                             <div className="grid grid-cols-12 gap-4 h-full">
//                                 {
//                                     news.gridNews.map((item, index) => (
//                                         <NoticiasGridCategory
//                                             key={item.id}
//                                             image={{ type: item.media.type as 'image' | 'video', url: item.media.url }}
//                                             pretitle={item.pretitle}
//                                             title={item.title}
//                                             category={item.category}
//                                             path={item.path!}
//                                             id={item.id}
//                                         />
//                                     ))
//                                 }
//                             </div>
//                         </div>
//                         {/* PUBLICIDAD INFERIOR DESKTOP  */}
//                         <InferiorDesktop url={ads?.media?.desktop?.bottom?.url || ''} />
//                     </div>
//                 }
//                 <div className="max-w-6xl 2xl:mx-auto px-3 lg:mr-[240px]">
//                     {
//                         filteredNews.map((item: Partial<NewsType>) => (
//                             <Link href={`/${decodeCategory}/${item.path}`} key={item._id} className="flex flex-col-reverse md:flex-row justify-between gap-2 md:gap-10 border-b py-4 hover:bg-gray-50 p-1">
//                                 <div className="min-w-fit text-xs md:text-sm text-muted-foreground font-light " >8 de mayo de 2024</div>
//                                 <div className="flex flex-col space-y-2 grow order-first md:order-none">
//                                     <h3 className="text-2xl font-semibold leading-none tracking-tight">{item.title}</h3>
//                                     <h4 className={`${fontMerriweather.className} text-md`}>{item.summary}</h4>
//                                     <h5 className="text-muted-foreground text-sm">Por <b className="text-foreground capitalize">{item.author}</b></h5>
//                                 </div>
//                                 {
//                                     item.media?.portada.type !== 'video' ? (
//                                         <Image
//                                             src={item.media?.portada.url ?? ''}
//                                             alt={item.title ?? ''}
//                                             width={400}
//                                             height={300}
//                                             className=" object-cover aspect-video rounded md:w-72 "
//                                             placeholder="blur"
//                                             blurDataURL={blurImage}
//                                             priority
//                                         />
//                                     ) : (
//                                         <video width="400" height="300" controls={true} autoPlay loop className="w-full object-cover aspect-video rounded md:w-72 ">
//                                             <source src={item.media?.portada.url} type="video/mp4" />
//                                             Tu navegador no soporta la etiqueta de video.
//                                         </video>
//                                     )
//                                 }
//                             </Link>
//                         ))
//                     }
//                 </div>

//             </div>
//         </div>
//     )
// }
