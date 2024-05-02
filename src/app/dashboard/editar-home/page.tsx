import PreviewEditorContainer from "./PreviewEditorContainer";

export default function page() {
    return (
        <div className="py-14 grid grid-cols-12 gap-4 h-screen">
            <PreviewEditorContainer />
            <div className='rounded border col-span-2 p-3 h-full'>
            </div>
        </div>
    )
}
