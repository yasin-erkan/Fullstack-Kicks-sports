import {FC} from 'react';
import DOMPurify from 'dompurify';
import {FaInfoCircle} from 'react-icons/fa';

interface FootProps {
  description: string;
}

const Foot: FC<FootProps> = ({description}) => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <FaInfoCircle className="text-my-blue text-xl" />
        <h2 className="text-2xl font-bold text-grey-dark">
          About this product
        </h2>
      </div>

      <div className="space-y-4">
        {description.split('<br/><br/>').map((text, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
            <div className="w-1.5 h-1.5 rounded-full bg-my-blue mt-2" />
            <p
              className="text-grey-main leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(text),
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Foot;

/*
 * To protect against XSS attacks (script code hidden in HTML)
 * DOMPurify library is used to sanitize the incoming HTML code and we use the HTML this way
 */
