import React, { useEffect, useMemo, useRef, useState } from 'react'
import Quill from 'quill';
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css";
import ImageResize from 'quill-image-resize';
import { DeleteIcon } from "../../assets/svg/Icon";
import CategoryList from '../../components/common/tag/CategoryList';
import { createArticle, getBlogDetail, getCategoryList } from '../../api/blog';
import { useNavigate, useParams } from 'react-router-dom';


Quill.register('modules/imageResize', ImageResize);


const BlogEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const quillRef = useRef(null);
  const [title, setTitle] = useState('');
  const [values, setValues] = useState();
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [category, setCategory] = useState('');
  const [categoryList, setCategoryList] = useState([])

  const getCategory = async () => {
    let result = await getCategoryList()
    setCategoryList(result.data)

    // setCategoryList(result)
  }

  const getBlog = async () => {
    let result = await getBlogDetail(id)
    setTitle(result.data.blogPostTitle)
    setTags(
      result.data.tagList.map(ele => ele.blogTagCon)
    )
    setValues(result.data.blogPostCon)
    // setDetail(result.data)
  }

  useEffect(() => {
    getBlog()
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
    if (title.length === 0 || values.length === 0) {
      alert('제목과 내용은 필수 입력 사항입니다.')
      return
    }
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
          onChange={(e) => setTitle(e.target.value)} value={title}
        />
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
          placeholder={"#태그를 추가해 보세요."}
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
        ref={quillRef}
        style={{ height: 'auto' }}
        theme="snow"
        modules={modules}
        onChange={setValues}
        value={values}
      />
      <div className='btn_wrap'>
        <button className='red' onClick={() => navigate(-1)}>수정취소</button>
        <button className="default" onClick={handleSubmit}>수정완료</button>
      </div>
    </div>
  )
}

export default BlogEdit
