
import AddTask from '@/components/AddTask';
import DateTimeFilter from '@/components/DateTimeFilter';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import StatAndFilter from '@/components/StatAndFilter';
import TaskList from '@/components/TaskList';
import TaskListPagination from '@/components/TaskListPagination';
import api from '@/lib/axios';
import { visibleTaskLimit } from '@/lib/data';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';


const HomePage = () => {
  const [taskBuffer, setTaskBuffer] = useState([]);
  const [activeTaskCount, SetActiveTaskCount] = useState(0);
  const [completeTaskCount, SetCompleteTaskCount] = useState(0);
  const [filter, setFilter] = useState();
  const [dateQuery, setDateQuery] = useState("today");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchTasks();
  }, [dateQuery]);

  useEffect(() => {
    setPage(1);
  }, [filter, dateQuery])

  //fetch api
  const fetchTasks = async () => {
    try {
      const response = await api.get(`/tasks?filter=${dateQuery}`);

      setTaskBuffer(response.data.tasks);
      SetActiveTaskCount(response.data.activeCount);
      SetCompleteTaskCount(response.data.completeCount);

    } catch (error) {
      console.log("Lỗi xảy ra khi truy xuất tasks:", error);
      toast.error("Lỗi xảy ra khi truy xuất tasks.");
    }
  };

  //biến
  const filteredTasks = taskBuffer.filter((task) => {
    switch (filter) {
      case "active":
        return task.status === "active";

      case "completed":
        return task.status === "complete";

      default:
        return true;

    }
  });


  //refresh
  const handleTaskChanged = () => {
    fetchTasks();
  };

  const visibleTasks = filteredTasks.slice(
    (page - 1) * visibleTaskLimit,
    page * visibleTaskLimit
  );

  const totalPages = Math.ceil(filteredTasks.length / visibleTaskLimit);

  const handleNext = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1)
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1)
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  if (visibleTasks.length === 0) {
    handlePrev();
  }


  return (
    <>
      <div className="min-h-screen w-full bg-[#fefcff] relative">
        {/* Dreamy Sky Pink Glow */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
        radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.35), transparent 60%),
        radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.4), transparent 60%)`,
          }}
        />
        {/* Your Content/Components */}
        <div className="container pt-8 mx-auto relative z-10">
          <div className="w-full max-w-2xl p-6 mx-auto space-y-6">

            <Header />
            <AddTask handleNewTaskAdded={handleTaskChanged} />
            <StatAndFilter
              filter={filter}
              setFilter={setFilter}
              activeTasksCount={activeTaskCount}
              completedTasksCount={completeTaskCount}
            />
            <TaskList
              filteredTasks={visibleTasks}
              filter={filter}
              handleTaskChanged={handleTaskChanged}
            />

            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <TaskListPagination
                handleNext={handleNext}
                handlePrev={handlePrev}
                handlePageChange={handlePageChange}
                page={page}
                totalPages={totalPages}
              />
              <DateTimeFilter
                dateQuery={dateQuery}
                setDateQuery={setDateQuery}
              />
            </div>

            <Footer
              activeTasksCount={activeTaskCount}
              completedTasksCount={completeTaskCount}
            />
          </div>
        </div>
      </div>

    </>
  )
}

export default HomePage;