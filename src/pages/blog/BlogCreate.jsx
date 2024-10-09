import React, { useEffect, useMemo, useState } from 'react'

import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { DeleteIcon } from "../../assets/svg/Icon";
import CategoryList from '../../components/common/tag/CategoryList';
import { createArticle, getCategoryList } from '../../api/blog';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [values, setValues] = useState();
  const [tags, setTags] = useState([]);
  const [category, setCategory] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [categoryList, setCategoryList] = useState([])

  useEffect(() => {
    const getCategory = async () => {
      let result = await getCategoryList()
      setCategoryList(result.data)

      // setCategoryList(result)
    }
    getCategory()
  }, [])

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

  const handleSubmit = async () => {
    let result = {
      blogPostTitle: title,
      blogPostCon: values,
      blogPostCatId: category,
      tagList: tags.map(ele => ({
        blogTagCon: ele
      }))
    }

    try {
      await createArticle(result)
      navigate('/blog/list'); // 임시로 navigate 위치 설정
    } catch (err) {
      console.error(err)
    }
  }


  return (
    <div className='blog_create_wrap'>
      <div className="title">
        <input type="text" placeholder={"제목을 입력하세요"}
          onChange={(e) => setTitle(e.target.value)} value={title} />
      </div>
      <div className='category'>
        <label>카테고리를 선택하세요</label>

        <CategoryList categoryList={categoryList} onClick={(cate) => { setCategory(cate) }} />
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
        value={values}
      />
      <div className='btn_wrap'>
        <button className="red" onClick={() => navigate(-1)}>나가기</button>
        <button className="default" onClick={handleSubmit}>저장하기</button>
      </div>
    </div>
  )
}

export default BlogCreate
