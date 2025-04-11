import {   ClockIcon,
    FaceSmileIcon,
    AdjustmentsHorizontalIcon,
    LockClosedIcon, } from '@heroicons/react/24/outline'
// ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon, 
const features = [
    {
      name: '24/7 Companionship',
      description:
        'Mel AI is available around the clock, providing assistance whenever you need it.',
      icon: ClockIcon,
    },
    {
      name: 'Personalized Insights',
      description:
        'Mel AI helps you identify emotional patterns and triggers, fostering greater self-understanding.',
      icon: FaceSmileIcon,
    },
    {
      name: 'Thought Reframing Tools',
      description:
        'Mel AI’s conversational cognitive behavioral techniques help reframe negative thoughts and promote a more positive mindset.',
      icon: AdjustmentsHorizontalIcon,
    },
    {
      name: 'Privacy and Security',
      description:
        'Your conversations with Mel AI are confidential and encrypted. Your reflections stay yours — safe, secure, and private.',
      icon: LockClosedIcon,
    },
  ]

export default function Features() {
  return (
    <div id="features" className="bg-transparent py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <p className="mt-2 text-5xl font-semibold tracking-tight text-balance text-white sm:text-6xl">
            What's Mel AI?
          </p>
          <p className="mt-6 text-lg/8 text-white">
            Mel AI is your mental wellness companion ensuring you are never alone on your journey. Designed to help you build self-awareness, emotional intelligence, and mindfulness—anytime, anywhere.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base/7 font-semibold text-white">
                  <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-[#2F52E0]">
                    <feature.icon aria-hidden="true" className="size-6 text-white" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base/7 text-white">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
