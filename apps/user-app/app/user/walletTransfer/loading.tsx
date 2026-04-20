import { PageBaseUi } from '@repo/ui/PageBaseUi'
import React from 'react'
import { PageTopBar } from '../../../components/PageTopBar'

export default function loading() {
    return (
        <PageBaseUi>
            <PageTopBar title='Transaction' />
            <div className="flex h-full px-5 flex-col gap-3 ">
                <div className='w-full h-[350px] rounded-xl border border-border bg-card p-6 animate-pulse'>

                </div>
                <div className='flex items-stretch gap-2 w-full'>
                    {/* Transfer Form Skeleton */}
                    <div className="w-2/3 rounded-xl border border-border bg-card p-6 animate-pulse">
                        <div className="flex gap-2 mb-6">
                            <div className="h-8 w-24 bg-gray-200 rounded" />
                            <div className="h-8 w-24 bg-gray-200 rounded" />
                        </div>

                        <div className="space-y-4">
                            <div className="h-10 w-full bg-gray-200 rounded" />
                            <div className="h-10 w-full bg-gray-200 rounded" />
                            <div className="flex gap-2">
                                <div className="h-8 w-16 bg-gray-200 rounded" />
                                <div className="h-8 w-16 bg-gray-200 rounded" />
                                <div className="h-8 w-16 bg-gray-200 rounded" />
                            </div>
                            <div className="h-10 w-40 bg-gray-200 rounded mt-4" />
                        </div>
                    </div>

                    {/* Recent Transactions Skeleton */}
                    <div className="w-1/3 rounded-lg border border-border bg-card p-6 animate-pulse">
                        <div className="mb-6">
                            <div className="h-5 w-40 bg-gray-200 rounded mb-2" />
                            <div className="h-3 w-32 bg-gray-200 rounded" />
                        </div>

                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="flex justify-between items-center">
                                    <div className="flex gap-3 items-center">
                                        <div className="h-8 w-8 bg-gray-200 rounded-lg" />
                                        <div>
                                            <div className="h-3 w-24 bg-gray-200 rounded mb-1" />
                                            <div className="h-3 w-16 bg-gray-200 rounded" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="h-3 w-12 bg-gray-200 rounded mb-1" />
                                        <div className="h-3 w-10 bg-gray-200 rounded" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </PageBaseUi>
    )
}
