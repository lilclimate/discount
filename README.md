# discount
优惠计算

# How

## 大纲
优惠类型: 套餐优惠、优惠券(待实现)、兑换券(待实现)、分时促销(待实现)
优惠策略: 互斥(选最佳)、叠加 (待实现)
价格计算 (待实现)

## 优惠类型
套餐优惠:

根据商品选择优惠力度最大的套餐

例如:

套餐A: [雪碧*1, 可乐* 1] 优惠1元
套餐B: [矿泉水*1, 可乐* 1] 优惠1元
套餐C: [雪碧*1, 可乐* 1, 矿泉水*1] 优惠2元
套餐D: [雪碧*2, 可乐* 1] 优惠3元
套餐E: [薯片*2 ] 优惠5元


场景1: 完全匹配
雪碧*1、可乐*1 -> 套餐A
场景2: 匹配且数量有多
雪碧*1、可乐*2 -> 套餐A

场景3: 匹配多个选最优
雪碧*2, 可乐* 1, 矿泉水*1 -> 套餐C& 套餐D -> 套餐C

场景4: 无匹配
可乐 * 1 -> 无

场景5: 无匹配
薯片 * 2 -> 套餐E(套餐价格大于原价)