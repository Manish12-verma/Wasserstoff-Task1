// src/components/QuillEditor.js
import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const QuillEditor = () => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    if (!quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        placeholder: 'Start typing...',
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            ['blockquote', 'code-block'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['clean'],
          ],
        },
      });
    }
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">RealTime Editor</h2>
      <div
        ref={editorRef}
        style={{ height: '600px', backgroundColor: '#fff' }}
      />
    </div>
  );
};

export default QuillEditor;
