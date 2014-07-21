function FirstController($scope, $http) {
    $scope.cats = [
        { "name": "Grumpy Cat", "mood": "Grumpy" },
        { "name": "Cieling Cat", "mood": "Good" },
        { "name": "Basement Cat", "mood": "Evil" }
    ];
    $scope.addCat = function (name, mood) {
        $scope.cats.push({ name: name, mood: mood });
        $scope.name = "";
        $scope.mood = "";
    }
    $scope.deleteCat = function (cat) {
        $http.delete("https://testalex2.firebaseio.com/"+cat.key+"/.json")
        .success(function () {
            var i = $scope.cats.indexOf(cat);
            $scope.cats.splice(i, 1);
        })
        .error(function () {
            alert("hisss");
        });
        
    };
    $scope.sendCat = function (cat) {
        $http.post("https://testalex2.firebaseio.com/.json", cat)
            .success(function (data, status, headers, config) {
                alert("Purrrrr" + data);
            })
            .error(function (data, status, headers, config) {
                alert("RRRWWWAAA...hisss" + data);
            });
    };
    $http.get("https://testalex2.firebaseio.com/.json")
        .success(function (data) {
            if (data !== "null") {
                for (var x in data) {
                    data[x].key = x;
                    $scope.cats.push(data[x]);
                }
            }
        })
        .error(function (data, status) {
            alert("Error on Get:" + data);
        });
}