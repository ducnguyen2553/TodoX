import { Card } from './ui/card'
import { Circle } from 'lucide-react'

const TaskEmptyState = ({ filter }) => {
    return (
        <Card
            className="p-8 text-center border-0 bg-gradient-card shadow-custom-md"
        >
            <div className="space-y-3">
                <div className=""></div>
                {/* <Circle className="mx-auto size-12 text-muted-foreground" /> */}
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-purple-600 mx-auto mb-4"></div>
                <h3 className="font-medium text-foreground">
                    {filter === "active"
                        ? "không có nhiệm vụ đang làm."
                        : filter === "completed"
                            ? "Chưa có nhiệm vụ nào hoàn thành."
                            : "Chưa có nhiệm vụ nào"
                    }
                </h3>

                <p className="text-sm text-muted-foreground">
                    {filter === "all"
                        ? "Thêm nhiệm vụ đầu tiên vào để bắt đầu"
                        : `Chuyền vào "tất cả" để thấy những nhiệm vụ
                         ${filter === "active" ? "đã hoàn thành" : "đang làm"}`
                    }
                </p>
            </div>
        </Card>
    )
}

export default TaskEmptyState;