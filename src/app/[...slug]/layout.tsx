// import { getNewsByPath } from "@/utils/utils";

// function capitalizeWords(str: string): string {
//     const decodedStr = decodeURIComponent(str);

//     if (decodedStr === 'portalcana') {
//         return 'Portal caña';
//     }
//     return decodedStr.replace(/\b\w/g, char => char.toUpperCase());
// }

// export async function generateMetadata({ params }: { params: { slug: string[] } }) {
//     const { slug } = params;
//     const [category, path] = slug;

//     if (category && path) {
//         try {
//             const news = await getNewsByPath(path);

//             if (!news) {
//                 return {
//                     title: 'Noticia no encontrada',
//                     description: 'No se encontró la noticia solicitada'
//                 };
//             }

//             return {
//                 title: news.title,
//                 description: news.summary
//             };
//         } catch (error) {
//             console.error("Error al generar metadatos:", error);
//             return {
//                 title: 'Error',
//                 description: 'Error al generar metadatos de la noticia'
//             };
//         }
//     }

//     if (category && !path) {
//         const decodeUriCategory = decodeURIComponent(category);
//         const categoryDescriptions: { [key: string]: string } = {
//             'politica': 'Últimas noticias y análisis sobre política local e internacional.',
//             'eco & negocios': 'Información relevante sobre economía y negocios.',
//             'deportes': 'Noticias y actualizaciones del mundo del deporte.',
//             'tendencias': 'Lo más reciente en tendencias y cultura popular.',
//             'portalcana': 'Portal dedicado a las noticias de la industria de la caña.',
//         };

//         return {
//             title: `${capitalizeWords(decodeUriCategory)} - Tendencia de noticias`,
//             description: categoryDescriptions[decodeUriCategory]
//         };
//     }

// }

// export default function Layout({ children }: { children: React.ReactNode }) {

//     return (
//         <section>
//             {children}
//         </section>
//     )
// }