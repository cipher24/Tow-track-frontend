// import { useState } from 'react';
import './comment.scss';
import CloseIcon from '../icons/close-icon';

/**
 * @param {string} content - initial text inside textarea
 * @param {string} variant - field determining textarea view
 * @param {number} initialCount - initial count of сharacters
 */
function Comment({ content, variant, value, onChange }) {
  // const [count, setCount] = useState(initialCount);

  // const handleChange = (e) => {
  //   setCount(e.target.value.length);
  // };
  // initialCount=0

  return (
    <div className="comment__container">
      <textarea
        className={`comment__textarea ${
          variant ? `comment__textarea_variant-${variant}` : ''
        }`}
        placeholder="Комментарий"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {content}
      </textarea>
      {content !== '' && variant === 'writing' && (
        <>
          <div className="comment__close-icon">
            <CloseIcon width="16px" height="16px" />
          </div>
          {/* <div className="comment__counter">{`${count}/100`}</div> */}
        </>
      )}
    </div>
  );
}
export default Comment;
