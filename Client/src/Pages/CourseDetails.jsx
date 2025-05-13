import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import axios from 'axios'
import { ArrowLeft, PlayCircle } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

const CourseDetails = () => {
    const navigate = useNavigate()
    const params = useParams()
    const courseId = params.courseId
    const { course } = useSelector(store => store.course)
    const selectedCourse = course.find(course => course._id === courseId)
    const [courseLecture, setCourseLecture] = useState(null)
    let n=0
    useEffect(()=> {
        const getCourseLecture = async()=> {
            try {
                const res = await axios.get(`https://knowledgenest-q9le.onrender.com/api/v1/course/${courseId}/lecture`, {withCredentials:true})
                if(res.data.success){
                    setCourseLecture(res.data.lectures)
                }
            } catch (error) {
                console.log(error);
                
            }
        }
        getCourseLecture()
    })

    const handleLectureClick = (index) => {
        n = index
        console.log(n);
    }
    return (
        <div className='bg-gray-100 md:p-10 '>
            <Card className="max-w-7xl rounded-md mx-auto bg-white shadow-md pt-5 mt-14">
                {/* Header section */}
                <div className='px-4 py-1'>
                    <div className='flex justify-between items-center'>
                        <div className='flex gap-2 items-center'>
                            <Button size="icon" variant="outline" className="rounded-full" onClick={() => navigate('/')}>
                                <ArrowLeft size={16} />
                            </Button>
                            <h1 className='md:text-2xl font-bold text-gray-800'>{selectedCourse.courseTitle}</h1>
                        </div>
                        <div className='flex space-x-4'>
                            <Button className="bg-blue-500 hover:bg-blue-600">Enroll Now</Button>
                        </div>
                    </div>
                </div>
                {/* Course overview section */}
                <div className='p-6'>
                    <div className='flex flex-col lg:flex-row lg:space-x-8'>
                        <img src={selectedCourse.courseThumbnail} alt="Thumbnail" className='w-full lg:w-1/3 rounded-md mb-4 lg:mb-0' />
                        <div>
                            <p className='text-gray-800 mb-4 font-semibold capitalize'>{selectedCourse.subTitle}</p>
                            
                            <p className="text-gray-800 font-semibold">⭐⭐⭐⭐⭐ (4.8) | 1,200 reviews</p>
                            <div className='mt-1'>
                            </div>
                            <ul className="mt-4 space-y-2">
                                <li className="text-gray-600">✔ 30+ hours of video content</li>
                                <li className="text-gray-600">✔ Lifetime access to course materials</li>
                                <li className="text-gray-600">✔ Certificate of completion</li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* Course Details Section */}
                <div className="  p-6">
                    <p className='mb-4 text-gray-700' dangerouslySetInnerHTML={{ __html: selectedCourse.description }} />
                </div>
                {/* course lectures */}
                {
                    courseLecture?.length == 0 ? null : <div className='flex flex-col md:flex-row justify-between gap-10 p-6'>
                        <div className='flex-1'>
                            <h2 className='text-xl font-bold text-gray-800'>Course Curriculum</h2>
                            <p className='text-gray-700 italic my-2'>{courseLecture?.length} Lectures</p>
                            <div className='space-y-4'>
                                {
                                    courseLecture?.map((lecture, index)=>{
                                        return <div key={index} className='flex items-center gap-3 bg-gray-200 p-4 rounded-md cursor-pointer'>
                                            <span>
                                                { <Button onClick={handleLectureClick(index)}><PlayCircle size={20}/></Button>}
                                            </span>
                                            <p>{lecture.lectureTitle}</p>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                        <div className='w-full lg:w-1/3'>
                        <Card>
                            <CardContent className="p-4 flex flex-col">
                                   <div className='w-full aspect-video mb-4'>
                                    <ReactPlayer 
                                    width="100%" 
                                    height="100%"
                                    url={courseLecture ? courseLecture[n]?.videoUrl : null}
                                    controls={true}
                                    />
                                   </div>
                                   <h1>{courseLecture ? courseLecture[n]?.lectureTitle : "Lecture Title"}</h1>
                                   <Separator className="my-2"/>
                            </CardContent>
                            <CardFooter className="flex p-4">
                              <Button>Continue Course</Button>
                            </CardFooter>
                        </Card>
                        </div>
                    </div>
                }
                {/* instructor section */}
                <div className='p-6'>
                    <h2 className='text-xl font-bold text-gray-800 mb-4'>Instructor</h2>
                    <div className='flex items-center space-x-4'>
                        <img 
                        src={selectedCourse.creator.photoUrl} 
                        alt="instructor" 
                        className='w-16 h-16 rounded-full' 
                        />
                        <div>
                            <h3 className='text-lg font-bold text-gray-800'>{selectedCourse.creator.name}</h3>
                            
                        </div>
                    </div>
                    <p className='text-gray-700 mt-4'>
                        {selectedCourse.creator.description}
                    </p>
                </div>
            </Card>
        </div>
    )
}

export default CourseDetails
