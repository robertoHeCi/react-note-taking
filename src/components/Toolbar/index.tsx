import { TextIcon, ImageIcon, CheckBoxIcon } from '../Icons';

const toolbarButtons = [
  {
    id: 'text',
    icon: TextIcon,
    className: 'rounded-s-lg border',
  },
  {
    id: 'todo',
    icon: CheckBoxIcon,
    className: 'border-t border-b',
  },
  {
    id: 'image',
    icon: ImageIcon,
    className: 'rounded-e-lg border',
  }
];

const Toolbar = ({ handleClick }: { handleClick: (type: string) => void }) => {
  const baseClassName = "inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white";

  return (
    <div className="inline-flex rounded-md shadow-sm" role="group">
      {toolbarButtons.map(({ id, icon: Icon, className }) => (
        <button
          key={id}
          type="button"
          className={`${baseClassName} ${className}`}
          onClick={() => handleClick(id)}
        >
          <Icon />
        </button>
      ))}
    </div>
  );
};

export default Toolbar;