import MemberStatCard from "./MemberStatCard"
import { useMembers } from "../hooks/useMembers"
import { FaUsers, FaUserPlus, FaUserMinus, FaUserCheck } from "react-icons/fa"


export default function MembersStatSection() {
  console.log("MembersStatSection rendered")
  const { data, loading, error } = useMembers()

  if (loading) return <div className="p-4">กำลังโหลดข้อมูลสมาชิก...</div>
  if (error) return <div className="p-4 text-red-600">โหลดข้อมูลสมาชิกไม่สำเร็จ</div>
  if (!data) return null

  return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      <MemberStatCard
        title="สมาชิกทังหมด"
        value={data.totalMembers}
        icon={FaUsers}
        accent="bg-blue-300"
      />
      <MemberStatCard
        title="เข้าใหม่วันนี้"
        value={data.joinToday}
        icon={FaUserPlus}
        accent="bg-emerald-300"
      />
      <MemberStatCard
        title="ออกวันนี้"
        value={data.leaveToday}
        icon={FaUserMinus}
        accent="bg-rose-300"
      />
      <MemberStatCard
        title="สมาชิกคงเหลือ"
        value={data.remainMembers}
        icon={FaUserCheck}
        accent="bg-amber-300"
      />
    </div>
    
  )
}
