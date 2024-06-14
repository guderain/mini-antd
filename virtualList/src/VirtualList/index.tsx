import React, { useState, useRef, useEffect } from 'react';

interface VirtualListProps<T> {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  itemHeight: number;
  viewportHeight: number;
}

function VirtualList<T>({ data, renderItem, itemHeight, viewportHeight }: VirtualListProps<T>) {
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(Math.ceil(viewportHeight / itemHeight));
  const containerRef = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleScroll = () => {
        // 计算已经滚动了多少个 item
        const visibleItems = Math.ceil((containerRef.current?.scrollTop ?? 0) / itemHeight);
        // visibleItems - 1 而不是 visibleItems 为了滚动更流畅
        // 更新开始和结束的 索引
        const newStart = Math.max(0, visibleItems - 1);
        const newEnd = newStart + Math.ceil(viewportHeight / itemHeight);
        setStart(newStart);
        setEnd(newEnd);
    };

    containerRef.current?.addEventListener('scroll', handleScroll);

    return () => {
      containerRef.current?.removeEventListener('scroll', handleScroll);
    };
  }, [viewportHeight, itemHeight]);

  return (
    <div ref={containerRef} style={{ height: viewportHeight, overflow: 'auto', position: 'relative' }}>
      <div style={{ height: data.length * itemHeight, position: 'relative' }}>
        {data.slice(start, end).map((item, index) => (
          <div
            key={index}
            style={{ height: itemHeight, position: 'absolute', top: (start + index) * itemHeight }}
            ref={el => el && observer.current?.observe(el)}
            data-index={start + index}
          >
            {renderItem(item, start + index)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default VirtualList;