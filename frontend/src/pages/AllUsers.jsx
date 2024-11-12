import { useEffect, useState } from "react";
import { SummaryApi } from "../common";
import { toast } from "react-toastify";
import { MdModeEdit } from "react-icons/md";
import moment from "moment";
import ChangeUserRole from "../components/ChangeUserRole";

function AllUser() {
	const [allUsers, setAllUsers] = useState([]);
	const [openUpdateRole, setOpenUpdateRole] = useState(false);
	const [updateUserDetails, setUpdateUserDetails] = useState({
		_id: "",
		name: "",
		email: "",
		role: "",
	});

	const getAllUsers = async () => {
		const dataResponse = await fetch(SummaryApi.allUsers.url, {
			method: SummaryApi.allUsers.method,
			credentials: "include",
		});

		const dataApi = await dataResponse.json();
		if (dataApi.success) setAllUsers(dataApi.data);
		if (dataApi.error) toast.error(dataApi.message);
	};

	useEffect(() => {
		getAllUsers();
	}, []);

	return (
		<div className='bg-white pb-4'>
			<table className='w-full bg-white'>
				<thead>
					<tr className='bg-black text-white'>
						<th className='border text-base font-medium'>Sr.</th>
						<th className='border text-base font-medium'>Name</th>
						<th className='border text-base font-medium'>Email</th>
						<th className='border text-base font-medium'>Role</th>
						<th className='border text-base font-medium'>Created Date</th>
						<th className='border text-base font-medium'>Action</th>
					</tr>
				</thead>
				<tbody>
					{allUsers?.map((user, index) => {
						return (
							<tr key={user._id}>
								<td className='border text-base text-center'>{index + 1}</td>
								<td className='border text-base text-center'>{user.name}</td>
								<td className='border text-base text-center'>{user.email}</td>
								<td className='border text-base text-center'>{user.role}</td>
								<td className='border text-base text-center'>{moment(user?.createdAt).format("LL")}</td>
								<td className='border text-base text-center'>
									<button
										className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white'
										onClick={() => {
											setUpdateUserDetails(user), setOpenUpdateRole(!openUpdateRole);
										}}
									>
										<MdModeEdit />
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>

			{openUpdateRole && (
				<ChangeUserRole
					userId={updateUserDetails._id}
					name={updateUserDetails.name}
					email={updateUserDetails.email}
					role={updateUserDetails.role}
					onclose={() => setOpenUpdateRole(!openUpdateRole)}
					getUsers={getAllUsers}
				/>
			)}
		</div>
	);
}

export default AllUser;
