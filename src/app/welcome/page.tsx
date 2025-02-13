
import { redirect } from 'next/navigation';
import { createClient } from '../utils/supabase/server';
import styles from './Page.module.css';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function PrivatePage() {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
        redirect('/login');
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Welcome My Angel!</h1>
            <p className={styles.message}>Hello, {data.user.email} 😊</p>
            <br />
            <Link href="/photoPuzzle">
                <Button
                    style={{
                        backgroundColor: 'blue',
                        color: 'white',
                        borderColor: 'blue',
                    }}
                    variant="outline"
                >
                    Next station!
                </Button>
            </Link>


        </div>
    );
}