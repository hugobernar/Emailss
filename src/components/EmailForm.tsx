import React, { useState, useEffect } from 'react';
import { EmailAccount } from '../types';
import { X, Plus } from 'lucide-react';

interface EmailFormProps {
  initialData?: Omit<EmailAccount, 'id'>;
  onSubmit: (data: Omit<EmailAccount, 'id'>) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

const defaultFormData: Omit<EmailAccount, 'id'> = {
  name: '',
  email: '',
  department: '',
  description: ''
};

const EmailForm: React.FC<EmailFormProps> = ({ 
  initialData, 
  onSubmit, 
  onCancel,
  isEditing = false
}) => {
  const [formData, setFormData] = useState<Omit<EmailAccount, 'id'>>(
    initialData || defaultFormData
  );
  const [newDepartment, setNewDepartment] = useState('');
  const [customDepartments, setCustomDepartments] = useState<string[]>([]);
  const [showNewDepartmentInput, setShowNewDepartmentInput] = useState(false);

  useEffect(() => {
    const storedDepartments = localStorage.getItem('customDepartments');
    if (storedDepartments) {
      setCustomDepartments(JSON.parse(storedDepartments));
    }
  }, []);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleAddDepartment = () => {
    if (newDepartment.trim()) {
      const updatedDepartments = [...customDepartments, newDepartment.trim()];
      setCustomDepartments(updatedDepartments);
      localStorage.setItem('customDepartments', JSON.stringify(updatedDepartments));
      setFormData(prev => ({ ...prev, department: newDepartment.trim() }));
      setNewDepartment('');
      setShowNewDepartmentInput(false);
    }
  };

  const defaultDepartments = [
    'Support',
    'Sales',
    'IT',
    'HR',
    'Marketing',
    'Finance',
    'Executive',
    'Other'
  ];

  const allDepartments = [...new Set([...defaultDepartments, ...customDepartments])];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
        <button 
          onClick={onCancel}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>
        
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          {isEditing ? 'Edit Email Account' : 'Add New Email Account'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department
              </label>
              {showNewDepartmentInput ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newDepartment}
                    onChange={(e) => setNewDepartment(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter new department"
                  />
                  <button
                    type="button"
                    onClick={handleAddDepartment}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Department</option>
                    {allDepartments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => setShowNewDepartmentInput(true)}
                    className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                required
              />
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {isEditing ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailForm;