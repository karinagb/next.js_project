
import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";


function HomePage(props) {

	return <MeetupList meetups={props.meetups} />;
}

export async function getStaticProps() {
	
	const client = await MongoClient.connect(
		"mongodb+srv://karingb27:Kurito.123@nextjs.ro2ttla.mongodb.net/?retryWrites=true&w=majority"
	);
	const db = client.db();
	const meetupsCollection = db.collection('meetups');

	const meetups = await meetupsCollection.find().toArray();
	client.close();

	return {
		props: {
			meetups: meetups.map(meetup => ({
				title:meetup.title,
				address: meetup.address, 
				image: meetup.image,
				id: meetup._id.toString()
			}))
		},
		revalidate: 1
	};
}

export default HomePage;
