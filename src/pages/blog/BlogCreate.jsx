import React, { useEffect, useMemo, useState } from 'react'

import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { DeleteIcon } from "../../assets/svg/Icon";
import TagList from '../../components/common/tag/TagList';
import { getCategoryList } from '../../api/blog';


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
  const [title, setTitle] = useState('');
  const [values, setValues] = useState();
  const [tags, setTags] = useState([]);
  const [category, setCategory] = useState('');
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

    if (tagInput && !tags.includes(tagInput) && tags.length < 4) {
      setTags([...tags, tagInput]);
      setTagInput('');
    }
  };

  const handleTagClick = (tag) => {
    setTags(tags.filter(t => t !== tag));
  };

  const handleSubmit = () => {
    let result = {
      blogPostTitle: title,
      blogPostCon: values,
      blogPostCatId: category,
      tagList: tags.map(ele => ({
        blogTagCon: ele
      }))
    }
  }


  return (
    <div className='blog_create_wrap'>
      <div className="title">
        <input type="text" placeholder={"제목을 입력하세요"} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div className='category'>
        <label>카테고리를 선택하세요</label>
        <TagList onClick={(cate) => { setCategory(cate) }} />
      </div>
      <div className="tag">
        <ul className="tag_list">
          {tags.map((tag, index) => (
            <li key={index} className="tag_item">
              {tag}
              <button className="close" onClick={() => handleTagClick(tag)}><DeleteIcon /></button>
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
        <button className="red">나가기</button>
        <button className="default" onClick={handleSubmit}>저장하기</button>
      </div>
    </div>
  )
}

export default BlogCreate
