var cartController = function ($scope) {
    $scope.cart = [
        {
            id: 1000,
            name: 'iPhone5s',
            quantity: 3,
            price: 4300
        },
        {
            id: 3300,
            name: 'iPhone5',
            quantity: 30,
            price: 3300
        },
        {
            id: 232,
            name: 'imac',
            quantity: 4,
            price: 23000
        },
        {
            id: 1400,
            name: 'iPad',
            quantity: 5,
            price: 6900
        }
    ];

    //计算总产品价格
    $scope.totalPrice = function () {
        var total = 0;
        angular.forEach($scope.cart, function (item) {
            total += item.quantity * item.price;
        });
        return total;
    }

    //计算总产品数量
    $scope.totalQuantity = function () {
        var total = 0;
        angular.forEach($scope.cart, function (item) {
            total += parseInt(item.quantity);
        });
        return total;
    }

    //增加当前产品的数量
    $scope.add = function (id) {
        var index = findIndex(id);
        ++$scope.cart[index].quantity;
    }

    //减少当前产品的数量
    $scope.reduce = function (id) {
        var index = findIndex(id);
        if (index != -1) {
            var item = $scope.cart[index];
            if (item.quantity > 1) {
                --item.quantity;
            } else {
                var returnKey = confirm('是否删除产品！');
                if (returnKey) {
                    $scope.remove(id);
                }
            }
        }
    }

    /**
     * [[查找当前的索引]]
     * @param   {[[Type]]} id [[当前产品的ID]]
     * @returns {[[Type]]} [[当前产品的索引]]
     */
    var findIndex = function (id) {
        var index = -1;
        angular.forEach($scope.cart, function (item, key) {
            if (item.id === id) {
                index = key;
                return;
            }
        });
        return index;
    }

    /**
     * [[移除当前的产品]]
     * @param {[[number]]} id [[当前产品的ID]]
     */
    $scope.remove = function (id) {
        var index = findIndex(id);
        $scope.cart.splice(index, 1);
    }

    // 实时监听数量的变化，出现数量小于1的则出提示
    $scope.$watch('cart', function (newValue, oldValue) {
        angular.forEach(newValue, function (item, key) {
            if (item.quantity < 1) {
                var returnKey = confirm('是否要删除这个产品');
                if (returnKey) {
                    $scope.remove(item.id);
                } else {
                    item.quantity = oldValue[key].quantity;
                }
            }
        })
    }, true);
}