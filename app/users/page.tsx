'use client';

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import CreateModal from "./create-user-Modal";
interface User {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  };
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("users.json");
        if (response.ok) {
          const data: User[] = await response.json();
          setUsers(data);
        } else {
          console.error("Failed to fetch users data");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <main className="p-8 bg-gray-50 min-h-screen">
      <CreateModal />

      <div className="grid grid-cols-4 gap-10 mt-10">
        {users.map((user) => (
          <div key={user.id} className={styles.userCard}>
            <p className="font-bold">{user.name}</p>
            <p className="mt-1">{user.company.name}</p>
            <p className="mt-1">{user.email}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
