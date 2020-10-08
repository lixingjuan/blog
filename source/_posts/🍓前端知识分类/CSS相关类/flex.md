# 容器属性

1. display
2. flex-direction
3. flex-wrap
4. flex-flow
5. justify-content
6. align-items
7. align-content

# 项目属性

1. order
2. flex-grow
3. flex-shrink：项目的缩小比例，默认为1，即如果空间不足，该项目将缩小;若一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小；
4. flex-basis： 定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小
5. flex：属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大
6. align-self