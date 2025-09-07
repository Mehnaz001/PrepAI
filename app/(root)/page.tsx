import InterviewCard from '@/components/InterviewCard'
import { Button } from '@/components/ui/button'
import { dummyInterviews } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div>
      <>
        <section className="card-cta">
          <div className="flex flex-col gap-6 max-w-lg">
            <h2>Get interview ready with AI powered Practice & Feedback</h2>
            <p className="text-lg">Practice on a real interview & get instant feedback</p>
            <Button asChild className="btn-primary max-sm:w-full">
              <Link href="/interview" >Start an interview</Link>
            </Button>
          </div>
          <Image src="/robot.png" alt='robo-dude' width={400} height={400} className="max-sm:hidden" />
        </section>

        <section className="flex flex-col gap-6 mt-8">
          <h2>Your interviews</h2>
          <div className="interviews-section">
            {dummyInterviews.map((interview) => (
              <InterviewCard {...interview} key={interview.id}/>
            ))}
            {/* <p>You haven't taken any interviews yet</p> */}
          </div>
        </section>

        <section className="flex flex-col gap-6 mt-8">
          <h2>Take an interview</h2>
          <div className="interviews-section">
            {dummyInterviews.map((interview) => (
              <InterviewCard {...interview} key={interview.id}/>
            ))}
            {/* <p>There are no interviews available</p> */ }
          </div>
        </section>
      </>
    </div>
  )
}

export default page
