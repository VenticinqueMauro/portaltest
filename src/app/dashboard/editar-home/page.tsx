import PreviewEditorContainer from "./PreviewEditorContainer";

export default function page() {
    return (
        <div className="py-14 grid grid-cols-12 gap-4 max-h-full">
            <PreviewEditorContainer />
            <div className='rounded border col-span-3 p-3 h-[600px]'>
            </div>
        </div>
    )
}
