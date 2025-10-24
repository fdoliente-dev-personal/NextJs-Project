import users from "@/data/users.json";
import styles from "./page.module.css";
import CreateModal from "./create-user-Modal";

export default function Users() {

  return (
    <main className="p-8 bg-gray-50 min-h-screen">
      <CreateModal />
      
      <div className="grid grid-cols-4 gap-10 mt-10">
        {users.map((user) => (
          <div
            key={user.id}
            className={styles.userCard}
          >
            <p className="font-bold">{user.name}</p>
            <p className="mt-1">{user.company.name}</p>
            <p className="mt-1">{user.email}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
