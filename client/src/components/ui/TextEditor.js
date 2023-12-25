import { useRef } from "react";
import {Editor} from "@tinymce/tinymce-react"

export default function TextEditor({setEventDescription}) {
    const TINY_MCE_API_KEY = process.env.TINY_MCE_API_KEY
    const editorRef = useRef(null);

    function handleEditorChange() {
        const content = editorRef.current.getContent();
        setEventDescription(content)
    }
    
    return (
      <>
        <Editor
          apiKey={TINY_MCE_API_KEY}
          onInit={(evt, editor) => editorRef.current = editor}
          initialValue="<p>Enter event details...</p>"
          onEditorChange={handleEditorChange}
          init={{
            height: 300,
            menubar: false,
            plugins: [
              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
              'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
              'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
            ],
            toolbar: 'undo redo | blocks | ' +
              'bold italic forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
            content_style: 'body { font-family:Roboto,Helvetica,Arial,sans-serif; font-size:16px; line-height: 1; }'
          }}
        />
      </>
    );
  }

  

