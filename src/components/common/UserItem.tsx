import React from "react";

interface UserItemProps {
    id: number;
    name: string;
    image: string;
    sub: string;
    key: number
}

const UserItem: React.FC<UserItemProps> = ({key, id, name, image, sub }) => (
    <>
    <div className="flex items-center justify-center" style={{gap:'31px'}} key={key}>
        <div className="nato-fontfamily" style={{fontSize: "24.34px", lineHeight: "34.08px"}}>0{id + 1}</div>
        <div className="flex" style={{gap: '21.37px'}}>
            <img
            // className="h-12 w-12"
            width={100}
            height={100}
            src={image}
            alt=""
            />
            <div className="flex flex-col items-start justify-center">
                <div className="">{name}</div>
                <div className="" style={{color: "#717171"}}>{sub}</div>
            </div>
        </div>
    </div>
    </>
)
export default UserItem;