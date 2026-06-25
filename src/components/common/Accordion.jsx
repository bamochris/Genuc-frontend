import React from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/24/outline';

/**
 * Composant Accordion pour sections repliables
 */

const Accordion = ({ items }) => {
  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      {items.map((item, index) => (
        <Disclosure key={index}>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between items-center px-6 py-4 text-left font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition border-b border-gray-200 dark:border-gray-700">
                {item.title}
                <ChevronUpIcon
                  className={`h-5 w-5 transition-transform ${open ? 'rotate-180' : ''}`}
                />
              </Disclosure.Button>
              {open && (
                <Disclosure.Panel className="px-6 py-4 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900">
                  {item.content}
                </Disclosure.Panel>
              )}
            </>
          )}
        </Disclosure>
      ))}
    </div>
  );
};

export default Accordion;
