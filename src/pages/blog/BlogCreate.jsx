import React, {useMemo, useState} from 'react'

import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';


const formats = [
  'font',
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'align',
  'color',
  'background',
  'size',
  'h1',
];


const BlogCreate = () => {

  const [values, setValues] = useState();
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');


  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ size: ['small', false, 'large', 'huge'] }],
          [{ align: [] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [
            {
              color: [],
            },
            { background: [] },
          ],
          ['image'],
        ],
      },
    };
  }, []);

  const handleTagInputChange = (event) => {
    setTagInput(event.target.value);
  };

  const handleAddTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput('');
    }
  };

  const handleTagClick = (tag) => {
    setTags(tags.filter(t => t !== tag));
  };




  return (
      <div className='blog_create_wrap'>
        <div className="title">
          <input type="text" placeholder={"제목을 입력하세요"}/>
        </div>
        <div className="tag">
          <ul className="tag_list">
            {tags.map((tag, index) => (
              <li key={index} className="tag_item">
                <div className="close" onClick={() => handleTagClick(tag)}>X</div>
                {tag}
              </li>
            ))}
          </ul>
          <input
            type="text"
            placeholder={"태그를 입력하세요"}
            value={tagInput}
            onChange={handleTagInputChange}
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                handleAddTag();
              }
            }}
          />
        </div>
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          onChange={setValues}
        />
        <div className='btn_wrap'>
          <button>나가기</button>
          <button>저장하기</button>
        </div>
      </div>
    )
}

export default BlogCreate
