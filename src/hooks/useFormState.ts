import { useCallback, useState } from "react";
import type { FormData } from "../Share/type";

type FormHandlers = {
  update: (path: string, value: any) => void;
  updateMultiple: (updates: Record<string, any>) => void;
  set: (path: string, value: any) => void;
  reset: () => void;
  personalInfo: (updates: Partial<FormData['personalInfo']>) => void;
  contact: (updates: Partial<FormData['contact']>) => void;
  address: (updates: Partial<FormData['contact']['address']>) => void;
  emergency: (updates: Partial<FormData['contact']['emergency']>) => void;
  employment: (updates: Partial<FormData['employment']>) => void;
  salary: (updates: Partial<FormData['employment']['salary']>) => void;
  preferences: (updates: Partial<FormData['preferences']>) => void;
  notifications: (updates: Partial<FormData['preferences']['notifications']>) => void;
};

const useFormState = (initialState: FormData): { formData: FormData } & FormHandlers => {
  const [formData, setFormData] = useState<FormData>(initialState);

  // Generic path-based updater
  const updateNestedField = useCallback((path: string, value: any) => {
    setFormData((prev) => {
      const keys = path.split(".");
      const newData = { ...prev };
      let current: any = newData;

      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (!current[key] || typeof current[key] !== "object") {
          current[key] = {};
        } else {
          current[key] = { ...current[key] };
        }
        current = current[key];
      }

      const lastKey = keys[keys.length - 1];
      current[lastKey] = value;
      return newData;
    });
  }, []);

  // Batch updater
  const updateMultipleFields = useCallback((updates: Record<string, any>) => {
    setFormData((prev) => {
      let newData = { ...prev };

      Object.entries(updates).forEach(([path, value]) => {
        const keys = path.split(".");
        let current: any = newData;

        for (let i = 0; i < keys.length - 1; i++) {
          const key = keys[i];
          current[key] = { ...current[key] };
          current = current[key];
        }

        current[keys[keys.length - 1]] = value;
      });

      return newData;
    });
  }, []);

  // Specialized handlers
  const personalInfo = useCallback((updates: Partial<FormData['personalInfo']>) => {
    setFormData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...updates }
    }));
  }, []);

  const contact = useCallback((updates: Partial<FormData['contact']>) => {
    setFormData(prev => ({
      ...prev,
      contact: { ...prev.contact, ...updates }
    }));
  }, []);

  const address = useCallback((updates: Partial<FormData['contact']['address']>) => {
    setFormData(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        address: { ...prev.contact.address, ...updates }
      }
    }));
  }, []);

  const emergency = useCallback((updates: Partial<FormData['contact']['emergency']>) => {
    setFormData(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        emergency: { ...prev.contact.emergency, ...updates }
      }
    }));
  }, []);

  const employment = useCallback((updates: Partial<FormData['employment']>) => {
    setFormData(prev => ({
      ...prev,
      employment: { ...prev.employment, ...updates }
    }));
  }, []);

  const salary = useCallback((updates: Partial<FormData['employment']['salary']>) => {
    setFormData(prev => ({
      ...prev,
      employment: {
        ...prev.employment,
        salary: { ...prev.employment.salary, ...updates }
      }
    }));
  }, []);

  const preferences = useCallback((updates: Partial<FormData['preferences']>) => {
    setFormData(prev => ({
      ...prev,
      preferences: { ...prev.preferences, ...updates }
    }));
  }, []);

  const notifications = useCallback((updates: Partial<FormData['preferences']['notifications']>) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        notifications: { ...prev.preferences.notifications, ...updates }
      }
    }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData(initialState);
  }, [initialState]);

  const setField = useCallback((path: string, value: any) => {
    updateNestedField(path, value);
  }, [updateNestedField]);

  return {
    formData,
    // setFormData,
    update: updateNestedField,
    set: setField,
    updateMultiple: updateMultipleFields,
    reset: resetForm,
    personalInfo,
    contact,
    address,
    emergency,
    employment,
    salary,
    preferences,
    notifications,
  };
};

export default useFormState;