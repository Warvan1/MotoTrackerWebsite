import Card from '@/components/Card';
import NavBar from '@/components/NavBar';
import { addUser } from '@/utilities/addUser';
import { getSession } from '@auth0/nextjs-auth0';

export default async function Home() {
    const session = await getSession()
    if(session) await addUser(session)

    return (
        <div>
            <NavBar sessionBool={!!session}/>
            <p className='flex justify-center p-2 text-text text-lg'>Home</p>
            <div className="flex justify-center">
                <div className="m-3 p-3 w-[24rem] bg-tertiaryContainer rounded-3xl">
                    <p className='flex justify-center p-2 text-text text-lg'>Android App</p>
                </div>
            </div>
            <Card>
                <p className='flex p-2 text-text text-sm'>With the android app you can use MotoTracker in a more convienent way. You can add fuel mantenance log entries using your phone camera by taking a picture of the fuel pump.</p>
                <p className='flex p-2 text-text text-sm'>To use the app clone the github repository and download it on your phone using android studio.</p>
                <a href="https://github.com/Warvan1/MotoTracker">
                    <button className='flex p-2 text-textButton bg-tertiary hover:bg-tertiaryContrast rounded-full'>Github</button>
                </a>
            </Card>
            <div className="flex justify-center">
                <div className="m-3 p-3 w-[24rem] bg-tertiaryContainer rounded-3xl">
                    <p className='flex justify-center p-2 text-text text-lg'>Usage Instructions</p>
                </div>
            </div>
            <Card>
                <p className='flex justify-center p-2 text-text'>Login</p>
                <p className='flex p-2 text-text text-sm'>To get started create an account and login to use the website. (or use the guest account: guest@mototracker.xyz password: Guest1!!)</p>
            </Card>
            <Card>
                <p className='flex justify-center p-2 text-text'>Dashboard</p>
                <p className='flex p-2 text-text text-sm'>The Dashboard displays information about the selected car from the Car Manager. It also displays the most recent maintenance by category.</p>
            </Card>
            <Card>
                <p className='flex justify-center p-2 text-text'>Maintenance Log</p>
                <p className='flex p-2 text-text text-sm'>The Maintenance Log is used to add, view, and delete maintenance log entries for the selected car.</p>
            </Card>
            <Card>
                <p className='flex justify-center p-2 text-text'>Statistics</p>
                <p className='flex p-2 text-text text-sm'>The Statistics page displays graphs for the selected car relating to fuel costs and efficiency.</p>
            </Card>
            <Card>
                <p className='flex justify-center p-2 text-text'>Car Manager</p>
                <p className='flex p-2 text-text text-sm'>You can use the Car Manager to add, edit, delete, and switch which car is active, for use in the Maintenance Log and Statistics pages.</p>
            </Card>
        </div>
    );
}
